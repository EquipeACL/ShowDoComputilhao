import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AudioService } from '../servicos/audio.service';

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
  acertou;
  constructor(
    private audioService: AudioService
  ) { }

  ngOnInit() {
    if (this.titulo === 'Parabéns! Você acertou.') {
      this.acao = ('Continuar!');
      this.acertou = true;
    }
    if (this.titulo !== 'Parabéns! Você acertou.') {
      this.acao = ('Ir para o ranking!');
      this.acertou = false;
    }

    if (this.titulo !== 'Você errou!' && this.titulo !== 'Parabéns! Você acertou.') {
      const audio = new Audio(`../../../assets/audios/tempoesgotado.mp3`);
      audio.volume = this.audioService.getVolume();
      audio.play();
    }
  }

  oncloseevent() {
    this.closeDiv.emit();
  }

}
