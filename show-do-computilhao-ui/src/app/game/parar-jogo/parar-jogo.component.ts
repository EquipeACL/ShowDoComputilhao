import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AudioService } from '../servicos/audio.service';

@Component({
  selector: 'app-parar-jogo',
  templateUrl: './parar-jogo.component.html',
  styleUrls: ['./parar-jogo.component.css']
})
export class PararJogoComponent implements OnInit {

  @Output() onclicksim = new EventEmitter();
  @Output() onclicknao = new EventEmitter();
  audio = new Audio('../../../assets/audios/vaiparar.mp3');
  constructor(
    private audioService: AudioService
  ) { }

  ngOnInit() {
    this.audio.volume = this.audioService.getVolume();
    this.audio.play();
  }

  sim() {
    let audio = new Audio('../../../assets/audios/okparou.mp3');
    audio.volume = this.audioService.getVolume();
    audio.play();
    this.onclicksim.emit();
  }

  nao() {
    this.onclicknao.emit();
  }

}
