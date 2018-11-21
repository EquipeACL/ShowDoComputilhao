import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AudioService } from '../servicos/audio.service';

@Component({
  selector: 'app-ganhou-ummihao',
  templateUrl: './ganhou-ummihao.component.html',
  styleUrls: ['./ganhou-ummihao.component.css']
})
export class GanhouUmmihaoComponent implements OnInit {
  @Output() close = new EventEmitter();
  constructor(
    private audioService: AudioService
  ) { }

  ngOnInit() {
    const audio = new Audio('../../../assets/audios/parabensvoceacabadeganhar1m.mp3');
    audio.volume = this.audioService.getVolume();
    audio.play();
  }

  onclose() {
    this.close.emit();
  }

}
