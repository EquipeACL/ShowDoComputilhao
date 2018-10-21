import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-universitarios',
  templateUrl: './universitarios.component.html',
  styleUrls: ['./universitarios.component.css']
})
export class UniversitariosComponent implements OnInit {
  @Output() ok = new EventEmitter();
  @Input() correta
  
  constructor() { }
  
  ngOnInit() {
    const audio = new Audio('../../../assets/audios/vamosverqualehaopiniaodosseuscolegas.mp3');
    audio.play();
  }

  clicouOk(){
    this.ok.emit();
  }

}
