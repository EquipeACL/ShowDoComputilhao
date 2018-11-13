import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
  perguntasExtras: any[];

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
  carregamentoInicial: boolean;
  modalUmMilhao: boolean;
  classOptions = ['opcao', 'opcao', 'opcao', 'opcao']; // vetor para controlar as opções validas
  @ViewChild('inputEscondido') inputEscondido: ElementRef;

  performance: any;
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
      "level": "",
      "year": ""
    }
  }

  ngOnInit() {
    const filters = this.activeRouter.snapshot.queryParams;
    if (Object.keys(filters).length === 0) {
      this._router.navigate(['/gameareas']);
    } else {
      this.questionService.buscarTodas(filters)
        .then(questions => {
          if (questions.result.length > 0 && questions.skips.length > 0) {
            setTimeout(() => {
              const audio = new Audio('../../../assets/audios/antesdapergunta.mp3');
              audio.play();
              this.listaPerguntas = questions.result;
              this.perguntasExtras = questions.skips;
              this.valorSeAcertar = valores['acertar'][this.indiceAtual];
              this.pergunta = this.listaPerguntas[this.indiceAtual++];
              //gerando as opções de forma aleatória
              this.pergunta.options = this.pergunta.options.sort();
              this.cronometroService.cronometroZerou.subscribe(() => {
                this.mensagem = 'Tempo esgotado!';
                this.modalErro = true;
              });
              this.carregamentoInicial = true;
              this.montarDadosDeDesempenho(this.listaPerguntas);
            }, 100);

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
      this.incrementarDesempenho(this.pergunta.level, this.pergunta.area);// Incremento as medidas de desempenho
      this.pergunta = this.listaPerguntas[this.indiceAtual++];
      //gerando as opções de forma aleatória
      this.pergunta.options = this.pergunta.options.sort();
      this.cronometroService.resetar();
      this.classOptions = ['opcao', 'opcao', 'opcao', 'opcao'];
      this.foco();
    }
    else { // Ganhou um milhao de reais
      this.valorSeParar = this.valorSeAcertar;
      this.valorSeErrar = valores['errar'][this.indiceAtual];
      this.valorSeAcertar = valores['acertar'][this.indiceAtual];
      this.modalUmMilhao = true;
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

        this.mensagem = 'Parabéns! Você acertou.';
        if (this.indiceAtual === 23) {
          this.mensagem = 'Parabéns você ganhou Um Milhão de Reias!';
        }
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
    this.foco();
  }

  fecharModalError() {
    // this.mensagem = 'Tempo esgotado!';
    this.closeModalError();
  }

  closeModalError() {
    if (this.mensagem === 'Parabéns! Você acertou.') {
      this.modalErro = false;
      this.proxima();
    }
    else {

      this.match.player = ' ';
      this.match.data = new Date();
      this.match.hits = this.indiceAtual;
      if (this.mensagem !== 'Parabéns você ganhou Um Milhão de Reias!') {
        this.match.score = this.valorSeErrar;
      }
      else {
        this.match.hits = this.indiceAtual++;
      }

      this.match.performance = this.performance;
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
    this.foco();
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
    this.foco();
  }

  mostrarPlacas() {
    this.modalPlacas = true;
    this.cronometroService.pausar();
  }

  placasFechou() {
    this.match.plates = 1;
    this.modalPlacas = false;
    this.cronometroService.iniciar();
    this.foco();
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
    this.foco();
  }


  mostrarModalPular() {
    this.modalPular = true;
    this.cronometroService.pausar();
  }

  modalPularSim() {
    this.modalPular = false;

    // Busco uma nova pergunta que tenha o mesmo level
    this.pergunta = this.perguntasExtras.find((elem) => {
      if (elem.level === this.pergunta.level) {
        return elem;
      }
    });

    // Removo a pergunta da lista de perguntas extras
    this.perguntasExtras = this.perguntasExtras.filter(elem => {
      if (elem.statement !== this.pergunta.statement) {
        return elem;
      }
    });
    this.match.skips++;
  }

  modalPularNao() {
    this.modalPular = false;
    this.cronometroService.iniciar();
    this.foco();
  }

  mostrarImagem() {
    this.modalImagem = true;
  }
  esconderImagem() {
    this.modalImagem = false;
    this.foco();
  }

  fecharModalUmMilhao() {
    this.mensagem = 'Parabéns você ganhou Um Milhão de Reias!';
    this.match.score = this.valorSeAcertar;
    this.modalUmMilhao = false;
    this.closeModalError();
  }
  private myFunc(event: KeyboardEvent): void {

    if (event.key.toUpperCase() === 'A') {

      this.mostrarConfirmacao(this.pergunta.options[0]);
    }
    else if (event.key.toUpperCase() === 'B') {
      this.mostrarConfirmacao(this.pergunta.options[1]);
    }
    else if (event.key.toUpperCase() === 'C') {
      this.mostrarConfirmacao(this.pergunta.options[2]);
    }
    else if (event.key.toUpperCase() === 'D') {
      this.mostrarConfirmacao(this.pergunta.options[3]);
    }
  }


  foco(): void {
    this.inputEscondido.nativeElement.focus();
  }
  clicounadiv() {
    this.foco();
  }

  montarDadosDeDesempenho(lista: any[]) {
    const low = this.getCount(lista, 'level', 'low');
    const medium = this.getCount(lista, 'level', 'medium');
    const high = this.getCount(lista, 'level', 'high');
    const mt = this.getCount(lista, 'area', 'matematica');
    const fd = this.getCount(lista, 'area', 'fundamentos');
    const tc = this.getCount(lista, 'area', 'tecnologia');
    this.performance = {
      "low": { "todas": low, "certas": 0 },
      "medium": { "todas": medium, "certas": 0 },
      "high": { "todas": high, "certas": 0 },
      "matematica": { "todas": mt, "certas": 0 },
      "fundamentos": { "todas": fd, "certas": 0 },
      "tecnologia": { "todas": tc, "certas": 0 },
    };
  }

  incrementarDesempenho(level: string, area: string) {
    this.performance[level]["certas"]++;
    this.performance[area]["certas"]++;
  }

  getCount(array: any[], field: string, str: string) {
    const r = array.filter(elem => {
      if (elem[field] === str) {
        return elem;
      }
    });
    return r.length;
  }
}

