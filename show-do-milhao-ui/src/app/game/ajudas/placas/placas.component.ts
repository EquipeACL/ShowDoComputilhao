import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-placas',
  templateUrl: './placas.component.html',
  styleUrls: ['./placas.component.css']
})
export class PlacasComponent implements OnInit {
  @Output() ok = new EventEmitter();
  audio = new Audio('../../../assets/audios/vamosverqualehaopiniaodosnossosconvidados.mp3');
  constructor() { }

  ngOnInit() {
    this.audio.play();
  }

  clicouOk() {
    this.ok.emit();
  }

}
