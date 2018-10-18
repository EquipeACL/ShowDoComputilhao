import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-universitarios',
  templateUrl: './universitarios.component.html',
  styleUrls: ['./universitarios.component.css']
})
export class UniversitariosComponent implements OnInit {
  @Output() ok = new EventEmitter();
  @Input() correta
  audio = new Audio('../../../assets/audios/vamosverqualehaopiniaodosseuscolegas.mp3');
  constructor() { }
  
  ngOnInit() {
    this.audio.play();
  }

  clicouOk(){
    this.ok.emit();
  }

}
