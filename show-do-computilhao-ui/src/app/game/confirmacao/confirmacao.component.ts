import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.css']
})
export class ConfirmacaoComponent implements OnInit {
  @Input() valor;
  @Output() onclicksim = new EventEmitter();
  @Output() onclicknao = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  sim() {
    this.onclicksim.emit();
  }

  nao() {
    this.onclicknao.emit();
  }
}
