import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {
  matematica: boolean;
  fundamentos: boolean;
  tecnologias: boolean;

  constructor(private router: Router) { }

  ngOnInit() { }

  onclickTodas(value) {
    this.matematica = value;
    this.fundamentos = value;
    this.tecnologias = value;
  }

  iniciarJogo() {
    let navigationExtras: NavigationExtras = {
      queryParams: { matematica: this.matematica, fundamentos: this.fundamentos, tecnologias: this.tecnologias }
    };
    this.router.navigate(['/game'], navigationExtras);
  }

}
