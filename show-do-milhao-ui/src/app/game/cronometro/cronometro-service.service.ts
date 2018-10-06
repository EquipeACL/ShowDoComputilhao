import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class CronometroService {
  resetarCronometro = new EventEmitter();
  iniciarCronometro = new EventEmitter();
  cronometroZerou = new EventEmitter();
  pausarCronometro= new EventEmitter();

  constructor() { }

  resetar() {
    this.resetarCronometro.emit();
  }

  zerou() {
    this.cronometroZerou.emit();
  }
  pausar(){
    this.pausarCronometro.emit();
  }

  iniciar(){
    this.iniciarCronometro.emit();
  }
}
