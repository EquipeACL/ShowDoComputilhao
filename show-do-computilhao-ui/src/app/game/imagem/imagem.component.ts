import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-imagem',
  templateUrl: './imagem.component.html',
  styleUrls: ['./imagem.component.css']
})
export class ImagemComponent implements OnInit {

  constructor() { }

  @Input() imagem;
  @Output() closeDiv = new EventEmitter();

  ngOnInit() {
  }

  oncloseevent() {
    this.closeDiv.emit();
  }

}
