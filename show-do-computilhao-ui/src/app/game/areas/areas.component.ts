import { AudioService } from './../servicos/audio.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit, OnDestroy {
  matematica: boolean;
  fundamentos: boolean;
  tecnologias: boolean;
  audio;

  constructor(
    private router: Router,
    private audioService: AudioService) { }

  ngOnInit() {
    this.audio = new Audio('../../../assets/audios/area.mp3');
    this.audio.volume = this.audioService.getVolume();
    this.audio.play();
  }
  ngOnDestroy() {
    this.audio.pause();
  }


  onclickTodas(value) {
    this.matematica = value;
    this.fundamentos = value;
    this.tecnologias = value;
  }

  iniciarJogo() {
    let navigationExtras: NavigationExtras = {
      queryParams: { matematica: this.matematica, fundamentos: this.fundamentos, tecnologias: this.tecnologias }
    };
    this.router.navigate(['/game'], navigationExtras);
  }

  clicouAudio() {
    if (this.audioService.getVolume() == 0) {
      this.audio.volume = 0;
    } else {
      this.audio.volume = 1;
    }
  }

}
