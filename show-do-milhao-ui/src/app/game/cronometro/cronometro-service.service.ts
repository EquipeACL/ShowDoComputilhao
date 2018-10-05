import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class CronometroService {
  resetarCronometro = new EventEmitter();
  cronometroZerou = new EventEmitter();

  constructor() { }

  resetar() {
    this.resetarCronometro.emit();
  }

  zerou() {
    this.cronometroZerou.emit();
  }
}
