import { element } from 'protractor';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AudioService } from '../../servicos/audio.service';

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

  constructor(
    private audioService: AudioService
  ) { }

  ngOnInit() {
    const audio = new Audio('../../../assets/audios/vamosverqualehaopiniaodosnossosconvidados.mp3');
    audio.volume = this.audioService.getVolume();
    audio.play();

    let valor = 1;
    this.opcoes = this.opcoes.splice(this.correta);

    this.opcoes.forEach(() => {
      if (Math.random() < valor) {
        this.resultado.push(this.correta);
      }
      else {
        this.resultado.push(this.opcoes[Math.floor(Math.random() * 4)]); // Exemplo: 0,4*4 = 1,6. PEgando o floor, fica 1
      }
      valor -= 0.23;

    });

    this.resultado = this.shuffle(this.resultado);

  }

  clicouFechar() {
    this.close.emit();
  }
  private shuffle(array: any[]): any[]{
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
