import { Component, OnInit, Input } from '@angular/core';
import { CronometroService } from './cronometro-service.service';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.component.html',
  styleUrls: ['./cronometro.component.css']
})
export class CronometroComponent implements OnInit {
  cronometro = 1000;
  styleCronometro = "cronometro";
  timer;
  constructor(private cronometroService: CronometroService ) { }

  ngOnInit() {
    this.timer = this.inciarCronometro();
    this.cronometroService.resetarCronometro.subscribe(()=>{
      this.resetarCronometro();
    });
    this.cronometroService.pausarCronometro.subscribe(()=>{
      this.pausarCronometro();
    });
    this.cronometroService.iniciarCronometro.subscribe(()=>{
      this.timer = this.inciarCronometro();
    });
  }



  inciarCronometro(): any {

    const time = setInterval(() => {
      this.cronometro--;
      if (this.cronometro === 0) {
        this.styleCronometro = "cronometro-acabou";
        this.cronometroService.zerou();
        clearInterval(time);
      }
      if (this.cronometro === 5) {
        this.styleCronometro = "ultimos-segundos";
      }
    }, 1000);
    return time;

  }

  resetarCronometro() {
    clearInterval(this.timer);

    this.cronometro = 10;
    this.styleCronometro = "badge-primary";
    this.timer = this.inciarCronometro();
  }

  pausarCronometro() {    
    clearInterval(this.timer);
  }
  

}
