import { Component, OnInit } from '@angular/core';
import { Router , NavigationExtras} from '@angular/router';

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
export class PerguntaComponent implements OnInit{
  match: IMatch;
  flags = ['A','B','C','D'];//Indica a letra da resposta  
  valorSeAcertar: any;
  valorSeParar: any = 0;
  pergunta: any;//A pergunta da vez
  indeceAtual = 0;
  listaPerguntas: any[];//Todas as perguntas  
  audio = new Audio('../../../assets/audios/vocetemcerteza.mp3');
  modalconfirmacao = false;
  modalerro = false;
  nomeaudio = 'tempoesgotado';
  mensagem = 'Tempo esgotado!';

  modalCartas: boolean;
  modalUniversitarios: boolean;
  modalPlacas: boolean
  modalParar: boolean;

  constructor(private cronometroService: CronometroService, private _router: Router, private matchService: MatchService){
    this.match =  new Match();
    this.listaPerguntas = [
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 01","area":"Area da questao01","correctOption":"A","level":"low","comment":"Questao facil de mais junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 02","area":"Area da questao02","correctOption":"A","level":"low","comment":"Questao facil de mais junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 03","area":"Area da questao03","correctOption":"C","level":"high","comment":"Questao dificil de mais junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 04","area":"Area da questao04","correctOption":"B","level":"medium","comment":"Questao mais ou menos junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 05","area":"Area da questao05","correctOption":"D","level":"low","comment":"Questao facil de mais junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 06","area":"Area da questao06","correctOption":"D","level":"high","comment":"Questao dificil de mais junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 07","area":"Area da questao07","correctOption":"A","level":"medium","comment":"Questao mais ou menos junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 08","area":"Area da questao08","correctOption":"C","level":"high","comment":"Questao dificil de mais junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 09","area":"Area da questao09","correctOption":"A","level":"low","comment":"Questao facil de mais junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 10","area":"Area da questao10","correctOption":"B","level":"high","comment":"Questao dificil de mais junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 01","area":"Area da questao01","correctOption":"A","level":"low","comment":"Questao facil de mais junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 02","area":"Area da questao02","correctOption":"A","level":"low","comment":"Questao facil de mais junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 03","area":"Area da questao03","correctOption":"C","level":"high","comment":"Questao dificil de mais junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 04","area":"Area da questao04","correctOption":"B","level":"medium","comment":"Questao mais ou menos junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 05","area":"Area da questao05","correctOption":"D","level":"low","comment":"Questao facil de mais junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 06","area":"Area da questao06","correctOption":"D","level":"high","comment":"Questao dificil de mais junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 07","area":"Area da questao07","correctOption":"A","level":"medium","comment":"Questao mais ou menos junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 08","area":"Area da questao08","correctOption":"C","level":"high","comment":"Questao dificil de mais junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 09","area":"Area da questao09","correctOption":"A","level":"low","comment":"Questao facil de mais junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 10","area":"Area da questao10","correctOption":"B","level":"high","comment":"Questao dificil de mais junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 10","area":"Area da questao10","correctOption":"B","level":"high","comment":"Questao dificil de mais junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 10","area":"Area da questao10","correctOption":"B","level":"high","comment":"Questao dificil de mais junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 10","area":"Area da questao10","correctOption":"B","level":"high","comment":"Questao dificil de mais junior"},
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 10","area":"Area da questao10","correctOption":"B","level":"high","comment":"Questao dificil de mais junior"}
    ];
    this.valorSeAcertar = valores[this.indeceAtual];
    this.pergunta = this.listaPerguntas[this.indeceAtual++];    
  }

  ngOnInit() {
    this.cronometroService.cronometroZerou.subscribe(()=>{
      this.modalerro = true;
    });
  }
  
  mostrarConfirmacao() {
    this.modalconfirmacao = true;
    this.cronometroService.pausar();
    this.tocar();
  }

  tocar(): void {
    this.audio.play();
  }
  
  
  proxima() {
    this.valorSeAcertar = valores[this.indeceAtual];
    this.pergunta = this.listaPerguntas[this.indeceAtual++];
    this.cronometroService.resetar();
  }

  validarResposta(): boolean {     
    return this.indeceAtual%2==0?false:true;
  }
  
  clicouSim(){
    this.modalconfirmacao = false;
    if(this.validarResposta()){
      this.valorSeParar = this.valorSeAcertar;
      this.proxima();
    }else{
      this.mensagem = "Você errou!";
      this.nomeaudio = 'quepenavoceerrou';
      this.modalerro = true;
    }
  }
  clicouNao(){
    this.modalconfirmacao = false;
    this.cronometroService.iniciar();
  }

  closeModalError(){
    
    this.match.player = ' ';
    this.match.score = this.valorSeParar;
    this.match.data = new Date();
    this.match.hits = this.indeceAtual-1;

    this.modalerro = false;
    
    this.matchService.salvar(this.match)
      .then((match)=>{
        let navigationExtras: NavigationExtras = {
          queryParams: {id:match._id}
        };
        this._router.navigate(['rank'], navigationExtras);
      })
      .catch((err)=>{
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
    let temp = [];
    let index = 0;
    console.log('Quantidade: '+event);
    this.pergunta.options.forEach(element => {
      if(element === this.pergunta.correctOption){
        temp.push(element);
      } else {
        if (index < event) {
          index++;
        } else {
          temp.push(element);
        }
      }
      
    });
    this.pergunta.options = temp;
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

  mostrarModalParar(){
    this.modalParar = true;
    this.cronometroService.pausar();
  }

  modalPararOk(){
    this.modalParar = false;
    this.closeModalError();
  }
  modalPararCancelar(){
    this.modalParar = false;
    this.cronometroService.iniciar();
  }
  
}

