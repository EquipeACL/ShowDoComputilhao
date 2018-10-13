import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMatch, Match } from '../pergunta/Match';
import { MatchService } from '../servicos/match.service';

@Component({
  selector: 'app-detalhes-jogador',
  templateUrl: './detalhes-jogador.component.html',
  styleUrls: ['./detalhes-jogador.component.css']
})
export class DetalhesJogadorComponent implements OnInit {
  private id: string;
  private match: IMatch;

  constructor(private matchService: MatchService,private route: ActivatedRoute) { 
    this.match = new Match();
    }

  ngOnInit() {
    this.carregarPartida();
  }

  carregarPartida() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.matchService.buscar(this.id)
      .then((match)=>{
        this.match = match;
      })
      .catch((err)=>{
        console.log(`Error ${err}`);
      });
  }

}
