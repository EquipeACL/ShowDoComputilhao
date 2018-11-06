import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-placas',
  templateUrl: './placas.component.html',
  styleUrls: ['./placas.component.css']
})
export class PlacasComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Input() correta;

  constructor() { }

  ngOnInit() {
    const audio = new Audio('../../../assets/audios/vamosverqualehaopiniaodosnossosconvidados.mp3');
    audio.play();
  }

  clicouFechar() {
    this.close.emit();
  }

}
