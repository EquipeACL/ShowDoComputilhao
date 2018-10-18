import { Component, OnInit, Output, EventEmitter} from '@angular/core';
@Component({
  selector: 'app-salvar-jogador',
  templateUrl: './salvar-jogador.component.html',
  styleUrls: ['./salvar-jogador.component.css']
})
export class SalvarJogadorComponent implements OnInit {
  
  @Output() salvar = new EventEmitter<any>();
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  oncloseevent() {
    this.close.emit();
  }

  salvarPartida(palyer: any) {    
    this.salvar.emit(palyer);
  }

}
