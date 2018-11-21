import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AudioService } from '../../servicos/audio.service';

@Component({
  selector: 'app-pular',
  templateUrl: './pular.component.html',
  styleUrls: ['./pular.component.css']
})
export class PularComponent implements OnInit {
  @Input() pulos: number;
  @Output() onclicksim = new EventEmitter();
  @Output() onclicknao = new EventEmitter();
  
  constructor(
    private audioService: AudioService
  ) { }

  ngOnInit() {
    let audio = new Audio('../../../assets/audios/vaipular.mp3');
    audio.volume = this.audioService.getVolume();
    audio.play();
  }

  clicouSim(){
    this.onclicksim.emit();
  }

  clicouNao(){
    this.onclicknao.emit();
  }

}
