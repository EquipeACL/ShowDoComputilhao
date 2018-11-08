import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  audio;

  constructor() { }

  ngOnInit() {
    this.audio = new Audio('../../../assets/audios/menuinicial.mp3');
    this.audio.play();
  }

  foiPraArea() {
    console.log('entrei no metodo');
    this.audio.pause();
  }
}
