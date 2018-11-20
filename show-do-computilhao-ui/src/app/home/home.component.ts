import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  audio;
  mute = true;
  constructor() { }

  ngAfterViewInit() {


    this.audio = new Audio('../../../assets/audios/menuinicial.mp3');
    this.audio.volume = 0;
    this.audio.play();
  }

  ngOnDestroy() {
    this.audio.pause();
  }

  muteSound() {
    if (this.mute === true) {
      console.log('Liguei o som');
      this.audio.volume = 1;
      this.mute = false;
    }
    else {
      console.log('Desliguei o som');
      this.audio.volume = 0;
      this.mute = true;
    }

  }

}
