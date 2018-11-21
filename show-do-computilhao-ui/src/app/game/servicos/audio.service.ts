import { Injectable } from '@angular/core';

@Injectable()
export class AudioService {
  private volume = 1;
  constructor() { }

  getVolume(){
    return this.volume;
  }

  ligar() {
    this.volume = 1;
  }

  desligar() {
    this.volume = 0;
  }
}
