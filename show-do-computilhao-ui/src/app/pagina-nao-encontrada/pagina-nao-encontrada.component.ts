import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-nao-encontrada',
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrls: ['./pagina-nao-encontrada.component.css']
})
export class PaginaNaoEncontradaComponent implements OnInit {
  timer = 5;
  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {

      this.router.navigate(['/']);
    }, 5000);
    setInterval(() => {
      this.timer--;
    }, 1000);
  }

}
