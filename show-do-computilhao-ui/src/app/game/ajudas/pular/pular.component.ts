import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pular',
  templateUrl: './pular.component.html',
  styleUrls: ['./pular.component.css']
})
export class PularComponent implements OnInit {
  @Input() pulos: number;
  @Output() onclicksim = new EventEmitter();
  @Output() onclicknao = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
    let audio = new Audio('../../../assets/audios/vaipular.mp3');
    audio.play();
  }

  clicouSim(){
    this.onclicksim.emit();
  }

  clicouNao(){
    this.onclicknao.emit();
  }

}
