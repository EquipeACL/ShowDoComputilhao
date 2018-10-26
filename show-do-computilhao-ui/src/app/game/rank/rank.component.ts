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
  
  constructor(private route: ActivatedRoute, private matchService: MatchService,private _router: Router) { 
    this.route.queryParams.subscribe((params: any) => {
      if(JSON.stringify(params) !== '{}'){
        this.modal = true;
        this.id = params.id;
      }else{
        this.modal = false;
      }
      this.validaId();
  });
  }
  validaId() {
    if(this.id){
      this.matchService.buscar(this.id)
      .then((match)=>{
        if(match.player!== ' '){
          this._router.navigate(['/rank']);
        }
      })
      .catch((err)=>{
        this._router.navigate(['/rank']);        
      });
    }
  }
  ngOnInit() {
    this.carregarPartidas();    
  }

  carregarPartidas() {
    console.log('Carregando partida!');
    this.matchService.buscarTodas()
      .then((matchs)=>{
        this.matchs = matchs;
      })
      .catch((err)=>{
        console.log(`Error: ${err}`);
      });
  }

  abrirModal(){
    this.modal = true;
  }

  salvarPartida(player: string){
    
    this.matchService.buscar(this.id)
      .then((match)=>{
        match.player = player;
        this.matchService.atualizar(match)
        .then((match)=>{
          this.carregarPartidas();
          this._router.navigate(['/rank']);
        })
        .catch((err)=>{
          console.log(`Error: ${err}`);
        });
      })
      .catch((err)=>{
        console.log(`Error: ${err}`);
      });
    
  }

  fecharModal(){
    this.matchService.deletar(this.id)
      .then(()=>{
        this.carregarPartidas();
        this._router.navigate(['/rank']);
      })
      .catch((err)=>{
        console.log(`Error: ${err}`);
      });   
    
  }

}
