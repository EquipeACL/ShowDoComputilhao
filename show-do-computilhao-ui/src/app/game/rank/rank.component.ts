import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatchService } from '../servicos/match.service';
import { ConverterScoreToString } from '../servicos/converterScoreToString';
@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {
  converter: ConverterScoreToString;
  match: any;
  modal: boolean = false;
  matchs = [];
  rows: number = 10;
  pagina: number = 0;
  pesquisando: boolean;

  constructor(private route: ActivatedRoute, private matchService: MatchService, private _router: Router) {
    this.converter = new ConverterScoreToString();
  }

  ngOnInit() {
    const match = JSON.parse(localStorage.getItem('match'));
    localStorage.removeItem('match');
    if(match !== null){
      this.match = match;
      this.abrirModal();
    }
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

  carregarPartidas() {
    // console.log('Carregando partida!');
    this.matchService.buscarTodas(0, this.rows)
      .then((matchs) => {
        this.matchs = matchs;
        const falta = this.rows - matchs.length;
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
    this.match.player = player;
    this.matchService.salvar(this.match)
      .then((match) => {
        this._router.navigate(['/detalhes/'+match._id]);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });    

  }

  fecharModal() {
      this.match = null;
      this.modal = false;
  }

  // Função para identificar o fim dos registros e desabilitar o botão proximo
  chegouAoFim(): boolean {
    try {
      return this.matchs[this.rows - 1].player == '';
    } catch (error) {
      return true;
    }

  }

   pesquisar(evento: any) {
    let busca: string = evento.target.value;
    
    this.matchService.buscar(busca)
      .then((matchs) => {
        this.matchs = matchs;
        const falta = this.rows - matchs.length;
        if (falta < this.rows) {
          for (let i = falta; i > 0; i--) {
            this.matchs.push({ _id: '', player: '', score: '' });
          }
        }
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });

      // pesquisando é utilizada para mostrar ou não a colocação no rank
      if(busca.length>0){
        this.pesquisando = true;
      }else{
        this.pesquisando = false;
      }
  }

}
