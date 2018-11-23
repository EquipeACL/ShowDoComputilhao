import { Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
@Component({
  selector: 'app-salvar-jogador',
  templateUrl: './salvar-jogador.component.html',
  styleUrls: ['./salvar-jogador.component.css']
})
export class SalvarJogadorComponent implements OnInit, OnDestroy{
  
  salvou: boolean = false;
  @Output() salvar = new EventEmitter<any>();
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('Salvou: '+this.salvou);
  }

  oncloseevent() {
    this.close.emit();
  }

  salvarPartida(player: any) { 
    // So salva se relamente tiver algum nome e não apenas espaços em branco
    if(player+''.trim().length == 0){
      this.close.emit();
    }else{
      this.salvou = true;
      this.salvar.emit(player);
    }   
  }

}
