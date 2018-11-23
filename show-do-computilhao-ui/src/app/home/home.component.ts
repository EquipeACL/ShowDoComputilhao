import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { AudioService } from '../game/servicos/audio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  audio;

  constructor(
    private audioService: AudioService
  ) { }

  ngAfterViewInit() {
    this.audio = new Audio('../../../assets/audios/menuinicial.mp3');
    this.audio.volume = this.audioService.getVolume() * 0.6;
    this.audio.play();
  }

  ngOnDestroy() {
    this.audio.pause();
  }

  clicouAudio() {
    if(this.audioService.getVolume() == 0) {
      this.audio.volume = 0;
    }else{
      this.audio.volume = 0.6;
    }
  }


}
