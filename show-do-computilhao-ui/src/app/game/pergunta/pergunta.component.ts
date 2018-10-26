import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { CronometroComponent } from '../cronometro/cronometro.component';
import { CronometroService } from '../cronometro/cronometro-service.service';
import { valores } from './valores-por-pergunta';
import { IMatch, Match } from './Match';
import { MatchService } from '../servicos/match.service';

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.css']
})
export class PerguntaComponent implements OnInit {
  match: IMatch;
  flags = ['A', 'B', 'C', 'D'];//Indica a letra da resposta  
  valorSeAcertar: any;
  valorSeParar: any = 0;
  pergunta: any;//A pergunta da vez
  opcao: string; // Opcao escolhida pelo usuário
  indeceAtual = 0;
  listaPerguntas: any[];//Todas as perguntas  

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

  constructor(private cronometroService: CronometroService, private _router: Router, private matchService: MatchService) {
    this.match = new Match();
    this.listaPerguntas = [
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Para quais valores de a, b, c, d, e, f a matriz J é diagonalizável?", "area": "Area da questao01", "correctOption": "A", "level": "low", "comment": "Questao facil de mais junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 02", "area": "Area da questao02", "correctOption": "A", "level": "low", "comment": "Questao facil de mais junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 03", "area": "Area da questao03", "correctOption": "C", "level": "high", "comment": "Questao dificil de mais junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 04", "area": "Area da questao04", "correctOption": "B", "level": "medium", "comment": "Questao mais ou menos junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 05", "area": "Area da questao05", "correctOption": "D", "level": "low", "comment": "Questao facil de mais junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 06", "area": "Area da questao06", "correctOption": "D", "level": "high", "comment": "Questao dificil de mais junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 07", "area": "Area da questao07", "correctOption": "A", "level": "medium", "comment": "Questao mais ou menos junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 08", "area": "Area da questao08", "correctOption": "C", "level": "high", "comment": "Questao dificil de mais junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 09", "area": "Area da questao09", "correctOption": "A", "level": "low", "comment": "Questao facil de mais junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 10", "area": "Area da questao10", "correctOption": "B", "level": "high", "comment": "Questao dificil de mais junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 01", "area": "Area da questao01", "correctOption": "A", "level": "low", "comment": "Questao facil de mais junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 02", "area": "Area da questao02", "correctOption": "A", "level": "low", "comment": "Questao facil de mais junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 03", "area": "Area da questao03", "correctOption": "C", "level": "high", "comment": "Questao dificil de mais junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 04", "area": "Area da questao04", "correctOption": "B", "level": "medium", "comment": "Questao mais ou menos junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 05", "area": "Area da questao05", "correctOption": "D", "level": "low", "comment": "Questao facil de mais junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 06", "area": "Area da questao06", "correctOption": "D", "level": "high", "comment": "Questao dificil de mais junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 07", "area": "Area da questao07", "correctOption": "A", "level": "medium", "comment": "Questao mais ou menos junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 08", "area": "Area da questao08", "correctOption": "C", "level": "high", "comment": "Questao dificil de mais junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 09", "area": "Area da questao09", "correctOption": "A", "level": "low", "comment": "Questao facil de mais junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 10", "area": "Area da questao10", "correctOption": "B", "level": "high", "comment": "Questao dificil de mais junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 10", "area": "Area da questao10", "correctOption": "B", "level": "high", "comment": "Questao dificil de mais junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 10", "area": "Area da questao10", "correctOption": "B", "level": "high", "comment": "Questao dificil de mais junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 10", "area": "Area da questao10", "correctOption": "B", "level": "high", "comment": "Questao dificil de mais junior" },
      { "options": ["A", "B", "C", "D"], "links": ["link1", "link2"], "statement": "Questao 10", "area": "Area da questao10", "correctOption": "B", "level": "high", "comment": "Questao dificil de mais junior" }
    ];
    this.valorSeAcertar = valores[this.indeceAtual];
    this.pergunta = this.listaPerguntas[this.indeceAtual++];
  }

  ngOnInit() {
    this.cronometroService.cronometroZerou.subscribe(() => {
      this.modalErro = true;
    });
  }

  mostrarConfirmacao(option: string) {
    this.opcao = option;
    this.modalConfirmacao = true;
    this.cronometroService.pausar();
    const audio = new Audio('../../../assets/audios/vocetemcerteza.mp3');
    audio.play();
  }

  proxima() {
    if (this.indeceAtual<=23) {
      this.valorSeParar = this.valorSeAcertar;
      this.valorSeAcertar = valores[this.indeceAtual];
      this.pergunta = this.listaPerguntas[this.indeceAtual++];
      this.cronometroService.resetar();
      this.classOptions = ['opcao', 'opcao', 'opcao', 'opcao'];
    }
    else{ // Ganhou um milhao de reais
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
      setTimeout(()=>{
        this.modalLoading = false;
        this.proxima();
      },4000);      
    } else {
      setTimeout(()=>{
        this.modalLoading = false;
        this.modalErro = true;
        this.mensagem = "Você errou!";
      },4000);
      
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
    this.match.score = this.valorSeParar;
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

