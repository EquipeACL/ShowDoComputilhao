import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-placas',
  templateUrl: './placas.component.html',
  styleUrls: ['./placas.component.css']
})
export class PlacasComponent implements OnInit {
  @Input() correta;
  @Output() close = new EventEmitter();
  audio = new Audio('../../../assets/audios/vamosverqualehaopiniaodosnossosconvidados.mp3');
  constructor() { }

  ngOnInit() {
    this.audio.play();
  }

  clicouFechar() {
    this.close.emit();
  }

}
