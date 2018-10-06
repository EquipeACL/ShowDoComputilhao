import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-erro',
  templateUrl: './erro.component.html',
  styleUrls: ['./erro.component.css']
})
export class ErroComponent implements OnInit {
  @Input() audio;
  @Input() message;
  @Output() closeDiv = new EventEmitter();
  sound;
  constructor() { }
  
  ngOnInit() {
    this.sound = new Audio(`../../../assets/audios/${this.audio}.wav`);
    this.sound.play();
  }

  oncloseevent() {
    this.closeDiv.emit()
  }

}
