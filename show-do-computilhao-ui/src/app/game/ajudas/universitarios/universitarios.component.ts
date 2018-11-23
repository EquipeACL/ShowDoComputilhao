import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AudioService } from '../../servicos/audio.service';


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

  constructor(
    private audioService: AudioService
  ) { }

  ngOnInit() {
    const audio = new Audio('../../../assets/audios/vamosverqualehaopiniaodosseuscolegas.mp3');
    audio.volume = this.audioService.getVolume();
    audio.play();


    let valor = 0.8;
    this.opcoes = this.opcoes.splice(this.correta);

    this.opcoes.forEach(() => {
      if (Math.random() < valor) {
        this.resultado.push(this.correta);
      }
      else {
        this.resultado.push(this.opcoes[Math.floor(Math.random() * 4)]);//Exemplo: 0,4*4 = 1,6. PEgando o floor, fica 1
      }
      valor -= 0.15;

    });

    this.resultado = this.shuffle(this.resultado);
  }

  private shuffle(array: any[]): any[]{
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  clicouOk() {
    this.ok.emit();
  }

}
