import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AudioService } from '../../servicos/audio.service';

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.component.html',
  styleUrls: ['./cartas.component.css']
})
export class CartasComponent implements OnInit {
  index: number;
  cartas = ['rei','as','2','3'];
  temp = ['../../../../assets/img/costa.png','../../../../assets/img/costa.png','../../../../assets/img/costa.png','../../../../assets/img/costa.png'];
  sorteada: string;
  @Output() num_cartas = new EventEmitter<number>();
  @Output() close = new EventEmitter();
  constructor(
    private audioService: AudioService
  ) { }

  ngOnInit() {
    const audio = new Audio('../../../assets/audios/tireaquiasuacartadobaralho.mp3');
    audio.volume = this.audioService.getVolume();
    audio.play();    
  }

  escolher(i: number) {
    this.index = this.getRandomIntIndex(this.cartas.length-1);
    this.sorteada = `../../../../assets/img/${this.cartas[this.index]}.png`;
    this.temp[i] = this.sorteada;
  }

  ok() {
    this.num_cartas.emit(this.index);
    this.cancelar();
  }
  cancelar() {
    this.close.emit();
  }

  public getRandomIntIndex(max) {
    let min = Math.ceil(0);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
