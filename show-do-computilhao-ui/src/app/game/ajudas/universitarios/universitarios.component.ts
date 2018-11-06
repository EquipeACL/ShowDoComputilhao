import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-universitarios',
  templateUrl: './universitarios.component.html',
  styleUrls: ['./universitarios.component.css']
})
export class UniversitariosComponent implements OnInit {
  @Output() ok = new EventEmitter();
  @Input() correta;
  opcoes = ['A', 'B', 'C', 'D'];
  resultado = [];

  constructor() { }

  ngOnInit() {
    const audio = new Audio('../../../assets/audios/vamosverqualehaopiniaodosseuscolegas.mp3');
    audio.play();


    let valor = 0.7;
    this.opcoes = this.opcoes.splice(this.correta);

    console.log(this.opcoes);

    this.opcoes.forEach(() => {
      if (Math.random() < valor) {
        this.resultado.push(this.correta);
      }
      else {
        this.resultado.push(this.opcoes[Math.ceil(Math.random() * 3));
      }
      valor -= 0.15;

    });

    this.resultado = this.resultado.sort();
  }



  clicouOk() {
    this.ok.emit();
  }

}
