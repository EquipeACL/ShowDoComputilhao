import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-erro',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class ErroComponent implements OnInit {

  @Input() titulo;
  @Input() comentario;
  @Input() links;
  @Output() closeDiv = new EventEmitter();
  @Input() correta;
  acao;
  constructor() { }

  ngOnInit() {
    if (this.titulo === 'Parabéns! Você acertou.') {
      this.acao = ('Continuar!');
    }
    if (this.titulo !== 'Parabéns! Você acertou.') {
      this.acao = ('Ir para o ranking!');
    }

    if (this.titulo !== 'Você errou!' && this.titulo !== 'Parabéns! Você acertou.') {
      const audio = new Audio(`../../../assets/audios/tempoesgotado.mp3`);
      audio.play();
    }
  }

  oncloseevent() {
    this.closeDiv.emit();
  }

}
