import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-erro',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class ErroComponent implements OnInit {
  @Input() audio;
  @Input() titulo;
  @Input() comentario;
  @Input() links;
  @Output() closeDiv = new EventEmitter();
  sound;
  constructor() { }
  
  ngOnInit() {
    this.sound = new Audio(`../../../assets/audios/${this.audio}.mp3`);
    this.sound.play();
  }

  oncloseevent() {
    this.closeDiv.emit()
  }

}
