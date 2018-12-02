import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { CronometroService } from '../cronometro/cronometro-service.service';
import { valores } from './valores-por-pergunta';
import { IMatch, Match } from './Match';
import { MatchService } from '../servicos/match.service';
import { QuestionService } from '../servicos/question.service';
import { ConverterScoreToString } from '../servicos/converterScoreToString';
import { AudioService } from '../servicos/audio.service';

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.css']
})
export class PerguntaComponent implements OnInit, OnDestroy {
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
  modalReview: boolean;
  modalLoadingInicial: boolean
  classOptions = ['opcao', 'opcao', 'opcao', 'opcao']; // vetor para controlar as opções validas

  suspense = new Audio();

  performance: any;
  constructor(
    private cronometroService: CronometroService,
    private _router: Router,
    private activeRouter: ActivatedRoute,
    private matchService: MatchService,
    private questionService: QuestionService,
    private audioService: AudioService
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
    this.modalLoadingInicial = true;
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
              audio.volume = this.audioService.getVolume();
              audio.play();
              this.listaPerguntas = questions.result;
              this.perguntasExtras = questions.skips;
              this.valorSeAcertar = valores['acertar'][this.indiceAtual];
              this.pergunta = this.listaPerguntas[this.indiceAtual++];
              //gerando as opções de forma aleatória
              this.pergunta.options = this.shuffle(this.pergunta.options);
              this.cronometroService.cronometroZerou.subscribe(() => {
                this.mensagem = 'Tempo esgotado!';
                this.modalErro = true;
              });
              this.carregamentoInicial = true;
              this.montarDadosDeDesempenho(this.listaPerguntas);
              this.modalLoadingInicial = false;
            }, 100);
            //música de suspense na pergunta
            setTimeout(() => {
              this.suspense = new Audio('../../../assets/audios/suspense.mp3');
              this.suspense.volume = this.audioService.getVolume() * 0.4;
              this.suspense.play();
            },3000);
          }

        })
        .catch(err => {
          console.error(`Problemas de acesso: ${err}`)
        });

    }
  }
  ngOnDestroy() {
    this.suspense.pause();
  }

  mostrarConfirmacao(option: string) {
    this.opcao = option;
    this.modalConfirmacao = true;
    this.cronometroService.pausar();
    const audio = new Audio('../../../assets/audios/vocetemcerteza.mp3');
    audio.volume = this.audioService.getVolume();
    audio.play();
  }

  proxima() {
    if (this.indiceAtual <= 23) {
      const audio = new Audio('../../../assets/audios/antesdapergunta.mp3');
      audio.volume = this.audioService.getVolume();
      audio.play();
      setTimeout(() => {
        this.suspense = new Audio('../../../assets/audios/suspense.mp3');
        this.suspense.volume = this.audioService.getVolume() * 0.4;
        this.suspense.play();
      },3000);
      this.valorSeParar = this.valorSeAcertar;
      this.valorSeErrar = valores['errar'][this.indiceAtual];
      this.valorSeAcertar = valores['acertar'][this.indiceAtual];
      this.incrementarDesempenho(this.pergunta.level, this.pergunta.area);// Incremento as medidas de desempenho
      this.pergunta = this.listaPerguntas[this.indiceAtual++];
      //gerando as opções de forma aleatória
      this.pergunta.options = this.shuffle(this.pergunta.options);
      this.cronometroService.resetar();
      this.classOptions = ['opcao', 'opcao', 'opcao', 'opcao'];

    }
    else { // Ganhou um milhao de reais
      this.valorSeParar = this.valorSeAcertar;
      this.valorSeErrar = valores['errar'][this.indiceAtual];
      this.valorSeAcertar = valores['acertar'][this.indiceAtual];
      this.modalUmMilhao = true;
    }
  }

  validarResposta(): boolean {
    //return this.opcao === this.pergunta.correctOption;
    return this.opcao === this.opcao;
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
        this.suspense.pause();
        this.modalErro = true; //Coloquei isso pra mostrar o feedback mesmo se o usuário acertar a pergunta
      }, 2000);

    } else {
      setTimeout(() => {
        this.modalLoading = false;
        this.modalErro = true;
        this.mensagem = 'Você errou!';
        this.suspense.pause();
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
    // this.mensagem = 'Tempo esgotado!';
    this.closeModalError();
  }

  closeModalError() {
    if (this.mensagem === 'Parabéns! Você acertou.') {
      this.modalErro = false;
      if (this.indiceAtual <= 23) {
        this.proxima();
      }
      else {
        this.modalUmMilhao = true;
      }
    }
    else {
      // Pegando informações da partida para salvar
      this.match.player = ' ';
      this.match.data = new Date();
      this.match.hits = this.indiceAtual - 1;
      this.match.score = this.valorSeErrar;
      this.match.performance = this.performance;

      localStorage.setItem('match',JSON.stringify(this.match));

      this.modalErro = false;

      this._router.navigate(['rank']);      
      
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

    // Busco uma nova pergunta que tenha o mesmo level
    this.pergunta = this.perguntasExtras.find((elem) => {
      if (elem.level === this.pergunta.level) {
        return elem;
      }
    });

    //gerando as opções de forma aleatória
    this.pergunta.options = this.shuffle(this.pergunta.options);

    // Removo a pergunta da lista de perguntas extras
    this.perguntasExtras = this.perguntasExtras.filter(elem => {
      if (elem.statement !== this.pergunta.statement) {
        return elem;
      }
    });
    this.match.skips++;
    this.cronometroService.iniciar();
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

  fecharModalUmMilhao() {
    this.mensagem = 'Parabéns você ganhou Um Milhão de Reias!';
    this.modalUmMilhao = false;
    this.incrementarDesempenho(this.pergunta.level, this.pergunta.area);
    // Pegando informações da partida para salvar
    this.match.player = ' ';
    this.match.data = new Date();
    this.match.hits = this.indiceAtual;
    this.match.score = this.valorSeAcertar;
    this.match.performance = this.performance;
    this.modalErro = false;      
    localStorage.setItem('match',JSON.stringify(this.match));
    this.modalErro = false;
    this._router.navigate(['rank']);   
  }

  mostrarModalReview() {
    this.modalReview = true;
    this.cronometroService.pausar();
  }

  fecharModalReview() {
    this.modalReview = false;
    this.cronometroService.iniciar();
  }

  /*
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
*/


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
  private shuffle(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


  clicouAudio() {
    if (this.audioService.getVolume() == 0) {
      this.suspense.volume = 0;
    } else {
      this.suspense.volume = 0.4;
    }
  }
}
