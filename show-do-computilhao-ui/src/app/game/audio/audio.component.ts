import { Component, OnInit, AfterViewInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { AudioService } from '../servicos/audio.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements AfterViewInit, OnDestroy {
  @Input() tamanho;
  mute = false;
  @Output() click = new EventEmitter();
  constructor(
    private audioService: AudioService
  ) { 
    if(this.audioService.getVolume() == 0){
      this.mute = true;
    }else{
      this.mute = false;
    }
  }

  ngAfterViewInit() {
    if(this.audioService.getVolume() == 0){
      this.mute = true;
    }else{
      this.mute = false;
    }    
  }

  ngOnDestroy() {
   
  }

  muteSound() {
    if (this.mute === true) {
      this.audioService.ligar();
      this.mute = false;
    }
    else {      
      this.audioService.desligar();
      this.mute = true;
    }
    this.click.emit();
  }

}
