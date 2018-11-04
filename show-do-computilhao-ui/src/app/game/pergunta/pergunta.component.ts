import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { CronometroService } from '../cronometro/cronometro-service.service';
import { valores } from './valores-por-pergunta';
import { IMatch, Match } from './Match';
import { MatchService } from '../servicos/match.service';
import { QuestionService } from '../servicos/question.service';

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.css']
})
export class PerguntaComponent implements OnInit {
  match: IMatch;
  flags = ['A', 'B', 'C', 'D'];//Indica a letra da resposta  
  valorSeErrar: any = 0;
  valorSeAcertar: any = 0;
  valorSeParar: any = 0;
  pergunta: any;//A pergunta da vez
  opcao: string; // Opcao escolhida pelo usuário
  indeceAtual = 0;
  listaPerguntas: any[];

  mensagem = 'Tempo esgotado!';

  modalConfirmacao: boolean;
  modalErro: boolean;
  modalCartas: boolean;
  modalUniversitarios: boolean;
  modalPlacas: boolean
  modalParar: boolean;
  modalPular: boolean;
  modalLoading: boolean;

  classOptions = ['opcao', 'opcao', 'opcao', 'opcao'];// vetor para controlar as opções validas

  constructor(
    private cronometroService: CronometroService,
    private _router: Router,
    private activeRouter: ActivatedRoute,
    private matchService: MatchService,
    private questionService: QuestionService
  ) {
    this.match = new Match();
    this.pergunta = {
      "statement": "",
      "options": ["", "", "", ""],
      "area": "",
      "correctOption": "",
      "img": "",
      "links": [{ "title": "", "link": "" }],
      "comment": "",
      "level": ""
    }
  }

  ngOnInit() {
    const filters = this.activeRouter.snapshot.queryParams;
    if (Object.keys(filters).length === 0) {
      this._router.navigate(['/gameareas']);
    } else {
      this.questionService.buscarTodas(filters)
        .then(questions => {
          if (questions.length > 0) {
            this.listaPerguntas = questions;
            this.valorSeAcertar = valores['acertar'][this.indeceAtual];
            this.pergunta = this.listaPerguntas[this.indeceAtual++];
            this.cronometroService.cronometroZerou.subscribe(() => {
              this.modalErro = true;
            });
          }
        })
        .catch(err => {
          console.error(`Problemas de acesso: ${err}`)
        });

    }
  }

  mostrarConfirmacao(option: string) {
    this.opcao = option;
    this.modalConfirmacao = true;
    this.cronometroService.pausar();
    const audio = new Audio('../../../assets/audios/vocetemcerteza.mp3');
    audio.play();
  }

  proxima() {
    if (this.indeceAtual <= 23) {
      this.valorSeParar = this.valorSeAcertar;
      this.valorSeErrar = valores['errar'][this.indeceAtual];
      this.valorSeAcertar = valores['acertar'][this.indeceAtual];
      this.pergunta = this.listaPerguntas[this.indeceAtual++];
      this.cronometroService.resetar();
      this.classOptions = ['opcao', 'opcao', 'opcao', 'opcao'];
    }
    else { // Ganhou um milhao de reais
      const audio = new Audio('../../../assets/audios/parabensvoceacabadeganhar1m.mp3');
      audio.play();
    }
  }

  validarResposta(): boolean {
    return this.opcao === this.pergunta.correctOption;
    // return this.opcao === this.opcao;
  }

  /**
   * Função para submeter resposta do usuário
   */
  clicouSim() {
    this.modalLoading = true;

    this.modalConfirmacao = false;
    if (this.validarResposta()) {
      setTimeout(() => {
        this.modalLoading = false;
        this.proxima();
      }, 4000);
    } else {
      setTimeout(() => {
        this.modalLoading = false;
        this.modalErro = true;
        this.mensagem = "Você errou!";
        this.match.score = this.valorSeErrar;
      }, 4000);

    }
  }

  /**
   * Função para cancelar resposta do usuário
   */
  clicouNao() {
    this.opcao = '';
    this.modalConfirmacao = false;
    this.cronometroService.iniciar();
  }

  closeModalError() {

    this.match.player = ' ';
    this.match.data = new Date();
    this.match.hits = this.indeceAtual - 1;

    this.modalErro = false;

    this.matchService.salvar(this.match)
      .then((match) => {
        let navigationExtras: NavigationExtras = {
          queryParams: { id: match._id }
        };
        this._router.navigate(['rank'], navigationExtras);
      })
      .catch((err) => {
        console.log(err);
      });

  }

  mostrarCartas() {
    this.modalCartas = true;
    this.cronometroService.pausar();
  }

  cartasFechou() {
    this.modalCartas = false;
    this.cronometroService.iniciar();
  }

  numCartas(event: number) {
    let index = 0;
    this.pergunta.options.forEach(element => {
      if (element !== this.pergunta.correctOption && event > 0) {
        this.classOptions[index] = 'opcao-invalida';
        event--;
      }
      index++;
    });
    this.match.cards = 1;
  }

  mostrarUniversitarios() {
    this.modalUniversitarios = true;
    this.cronometroService.pausar();
  }

  universitariosFechou() {
    this.match.universitaries = 1;
    this.modalUniversitarios = false;
    this.cronometroService.iniciar();
  }

  mostrarPlacas() {
    this.modalPlacas = true;
    this.cronometroService.pausar();
  }

  placasFechou() {
    this.match.plates = 1;
    this.modalPlacas = false;
    this.cronometroService.iniciar();
  }

  mostrarModalParar() {
    this.modalParar = true;
    this.cronometroService.pausar();
  }

  modalPararOk() {
    this.modalParar = false;
    this.match.score = this.valorSeParar;
    this.closeModalError();
  }

  modalPararCancelar() {
    this.modalParar = false;
    this.cronometroService.iniciar();
  }


  mostrarModalPular() {
    this.modalPular = true;
    this.cronometroService.pausar();
  }

  modalPularSim() {
    this.modalPular = false;
    this.proxima();
    this.match.skips++;
  }

  modalPularNao() {
    this.modalPular = false;
    this.cronometroService.iniciar();
  }

}

