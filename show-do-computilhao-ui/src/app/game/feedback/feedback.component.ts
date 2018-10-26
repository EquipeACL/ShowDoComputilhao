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
  
  constructor() { }
  
  ngOnInit() {
    if(this.titulo !=='Você errou!'){
      const audio = new Audio(`../../../assets/audios/tempoesgotado.mp3`);
      audio.play();
    }
  }

  oncloseevent() {
    this.closeDiv.emit()
  }

}
