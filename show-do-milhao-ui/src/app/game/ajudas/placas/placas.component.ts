import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-placas',
  templateUrl: './placas.component.html',
  styleUrls: ['./placas.component.css']
})
export class PlacasComponent implements OnInit {
  @Output() ok = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  clicouOk() {
    this.ok.emit();
  }

}
