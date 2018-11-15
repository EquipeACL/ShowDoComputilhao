import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  audio;

  constructor() { }

  ngAfterViewInit() {

    this.audio = new Audio('../../../assets/audios/menuinicial.mp3');
    this.audio.play();
  }

  ngOnDestroy() {
    this.audio.pause();
  }

}
