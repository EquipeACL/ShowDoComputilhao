import { Component, OnInit } from '@angular/core';
import { CronometroComponent } from '../cronometro/cronometro.component';
import { CronometroService } from '../cronometro/cronometro-service.service';

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.css']
})
export class PerguntaComponent implements OnInit{
  flags = ['A','B','C','D'];//Indica a letra da resposta
  pergunta: any;//A pergunta da vez
  indeceAtual = 0;
  listaPerguntas: any[];//Todas as perguntas
  
  //audio = new Audio('../../../assets/audios/song.mp3');
  
  
  modalerro = false;
  
  constructor(private cronometroService: CronometroService){
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
      {"options":["A","B","C","D"],"links":["link1","link2"],"statement":"Questao 10","area":"Area da questao10","correctOption":"B","level":"high","comment":"Questao dificil de mais junior"}
    ];
    this.pergunta = this.listaPerguntas[this.indeceAtual++];
  }

  ngOnInit() {
    this.cronometroService.cronometroZerou.subscribe(()=>{
      this.modalerro = true;
    });
  }
  
  tocar(): void {
    //this.audio.play();
  }
  
  
  proxima(){
    if(this.validarResposta()){
      this.pergunta = this.listaPerguntas[this.indeceAtual++];
      this.cronometroService.resetar();  
    }else{
      this.modalerro = true;
      //clearInterval(this.timer);
    }    
  }
  validarResposta(): boolean {
    return true;
  }
  
     

}

