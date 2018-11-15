import { element } from 'protractor';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-placas',
  templateUrl: './placas.component.html',
  styleUrls: ['./placas.component.css']
})
export class PlacasComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Input() correta;

  opcoes = ['A', 'B', 'C', 'D'];
  resultado = [];

  constructor() { }

  ngOnInit() {
    const audio = new Audio('../../../assets/audios/vamosverqualehaopiniaodosnossosconvidados.mp3');
    audio.play();

    let valor = 0.7;
    this.opcoes = this.opcoes.splice(this.correta);

    console.log(this.opcoes);

    this.opcoes.forEach(() => {
      if (Math.random() < valor) {
        this.resultado.push(this.correta);
      }
      else {
        this.resultado.push(this.opcoes[Math.floor(Math.random() * 4)]); // Exemplo: 0,4*4 = 1,6. PEgando o floor, fica 1
      }
      valor -= 0.15;

    });

    this.resultado = this.resultado.sort();

  }

  clicouFechar() {
    this.close.emit();
  }

}
