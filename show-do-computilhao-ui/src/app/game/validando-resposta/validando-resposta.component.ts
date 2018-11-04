import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-validando-resposta',
  templateUrl: './validando-resposta.component.html',
  styleUrls: ['./validando-resposta.component.css']
})
export class ValidandoRespostaComponent implements OnInit {

  @Input() resposta: boolean;

  constructor() {

  }

  ngOnInit() {
    let audio;
    if (this.resposta) {
      audio = new Audio('../../../assets/audios/certaresposta.mp3');

    } else {
      audio = new Audio('../../../assets/audios/quepenavoceerrou.mp3');
    }
    setTimeout(() => { audio.play() }, 1500);
  }

  teste(): string {
    if (this.resposta) {
      return 'loading';
    }
    return 'loading';
  }

}
