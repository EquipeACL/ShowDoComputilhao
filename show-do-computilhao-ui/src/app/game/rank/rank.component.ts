import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IMatch, Match } from '../pergunta/Match';
import { MatchService } from '../servicos/match.service';
@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {
  id: string;
  modal: boolean = false;
  matchs = [];
  rows: number = 10;
  pagina: number = 0;

  constructor(private route: ActivatedRoute, private matchService: MatchService, private _router: Router) {
    this.route.queryParams.subscribe((params: any) => {
      if (JSON.stringify(params) !== '{}') {
        this.modal = true;
        this.id = params.id;
      } else {
        this.modal = false;
      }
      this.validaId();
    });
  }

  ngOnInit() {
    this.carregarPartidas();
  }

  proximo() {
    this.pagina++;
    this.matchService.buscarTodas(this.rows * this.pagina, this.rows)
      .then((matchs) => {
        this.matchs = matchs;
        let falta = this.rows - matchs.length;
        if (falta < this.rows) {
          for (let i = falta; i > 0; i--) {
            this.matchs.push({ _id: '', player: '', score: '' });
          }
        }
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }  

  anterior() {
    this.pagina--;
    this.matchService.buscarTodas(this.rows * this.pagina, this.rows)
      .then((matchs) => {
        this.matchs = matchs;
        let falta = this.rows - matchs.length;
        if (falta < this.rows) {
          for (let i = falta; i > 0; i--) {
            this.matchs.push({ _id: '', player: '', score: '' });
          }
        }
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  validaId() {
    if (this.id) {
      this.matchService.buscar(this.id)
        .then((match) => {
          if (match.player !== ' ') {
            this._router.navigate(['/rank']);
          }
        })
        .catch((err) => {
          this._router.navigate(['/rank']);
        });
    }
  }

  carregarPartidas() {
    // console.log('Carregando partida!');
    this.matchService.buscarTodas(0, this.rows)
      .then((matchs) => {
        this.matchs = matchs;
        let falta = this.rows - matchs.length;
        if (falta < this.rows) {
          for (let i = falta; i > 0; i--) {
            this.matchs.push({ _id: '', player: '', score: '' });
          }
        }
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  abrirModal() {
    this.modal = true;
  }

  salvarPartida(player: string) {

    this.matchService.buscar(this.id)
      .then((match) => {
        match.player = player;
        this.matchService.atualizar(match)
          .then((match) => {
            this.carregarPartidas();
            this._router.navigate(['/rank']);
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });

  }

  fecharModal() {
    this.matchService.deletar(this.id)
      .then(() => {
        this.carregarPartidas();
        this._router.navigate(['/rank']);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });

  }
  // Função para identificar o fim dos registros e desabilitar o botão proximo
  chegouAoFim(): boolean{
    try {
      return this.matchs[this.rows-1].player == '';  
    } catch (error) {
      return true;
    }
    
  }
}
