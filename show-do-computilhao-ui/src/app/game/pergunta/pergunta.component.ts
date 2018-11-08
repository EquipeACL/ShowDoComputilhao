import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { CronometroService } from '../cronometro/cronometro-service.service';
import { valores } from './valores-por-pergunta';
import { IMatch, Match } from './Match';
import { MatchService } from '../servicos/match.service';
import { QuestionService } from '../servicos/question.service';
import { ConverterScoreToString } from '../servicos/converterScoreToString';

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.css']
})
export class PerguntaComponent implements OnInit {
  converter: ConverterScoreToString;
  match: IMatch;
  flags = ['A', 'B', 'C', 'D'];//Indica a letra da resposta
  valorSeErrar: any = 0;
  valorSeAcertar: any = 0;
  valorSeParar: any = 0;
  pergunta: any;//A pergunta da vez
  opcao: string; // Opcao escolhida pelo usuário
  indiceAtual = 0;
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
  modalImagem: boolean;

  classOptions = ['opcao', 'opcao', 'opcao', 'opcao'];// vetor para controlar as opções validas

  constructor(
    private cronometroService: CronometroService,
    private _router: Router,
    private activeRouter: ActivatedRoute,
    private matchService: MatchService,
    private questionService: QuestionService
  ) {
    this.converter = new ConverterScoreToString();
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
            const audio = new Audio('../../../assets/audios/antesdapergunta.mp3');
            audio.play();
            this.listaPerguntas = questions;
            this.valorSeAcertar = valores['acertar'][this.indiceAtual];
            this.pergunta = this.listaPerguntas[this.indiceAtual++];
            //gerando as opções de forma aleatória
            this.pergunta.options = this.pergunta.options.sort();
            this.cronometroService.cronometroZerou.subscribe(() => {
              this.mensagem = 'Tempo esgotado!';
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
    if (this.indiceAtual <= 23) {
      const audio = new Audio('../../../assets/audios/antesdapergunta.mp3');
      audio.play();
      this.valorSeParar = this.valorSeAcertar;
      this.valorSeErrar = valores['errar'][this.indiceAtual];
      this.valorSeAcertar = valores['acertar'][this.indiceAtual];
      this.pergunta = this.listaPerguntas[this.indiceAtual++];
      //gerando as opções de forma aleatória
      this.pergunta.options = this.pergunta.options.sort();
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
        this.mensagem = "Parabéns! Você acertou.";
        this.modalErro = true; //Coloquei isso pra mostrar o feedback mesmo se o usuário acertar a pergunta
      }, 2000);

    } else {
      setTimeout(() => {
        this.modalLoading = false;
        this.modalErro = true;
        this.mensagem = 'Você errou!';
        this.match.score = this.valorSeErrar;
      }, 2000);

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

  fecharModalError() {
    //this.mensagem = 'Tempo esgotado!';
    this.closeModalError();
  }

  closeModalError() {
    console.log(this.mensagem);
    if (this.mensagem === 'Parabéns! Você acertou.') {
      this.modalErro = false;

      this.proxima();
    }
    else {

      this.match.player = ' ';
      this.match.data = new Date();
      this.match.hits = this.indiceAtual - 1;
      this.match.score = this.valorSeErrar;
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
    this.mensagem = "Você errou!";
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
    this.proxima();//Aqui tem q ppegar uma questão que seja diferente das que tem na lista

    this.match.skips++;
  }

  modalPularNao() {
    this.modalPular = false;
    this.cronometroService.iniciar();
  }

  mostrarImagem() {
    this.modalImagem = true;
  }
  esconderImagem() {
    this.modalImagem = false;
  }
}

