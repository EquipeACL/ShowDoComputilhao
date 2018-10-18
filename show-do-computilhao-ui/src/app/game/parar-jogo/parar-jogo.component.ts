import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-parar-jogo',
  templateUrl: './parar-jogo.component.html',
  styleUrls: ['./parar-jogo.component.css']
})
export class PararJogoComponent implements OnInit {

  @Output() onclicksim = new EventEmitter();
  @Output() onclicknao = new EventEmitter();
  audio = new Audio('../../../assets/audios/vaiparar.mp3');
  constructor() { }

  ngOnInit() {
    this.audio.play();
  }

  sim() {
    let audio = new Audio('../../../assets/audios/okparou.mp3');
    audio.play();
    this.onclicksim.emit();
  }

  nao() {
    this.onclicknao.emit();
  }

}
