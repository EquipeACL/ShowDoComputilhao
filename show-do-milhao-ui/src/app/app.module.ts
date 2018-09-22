import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { DetalhesJogadorComponent } from './game/detalhes-jogador/detalhes-jogador.component';
import { PerguntaComponent } from './game/pergunta/pergunta.component';
import { RankComponent } from './game/rank/rank.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    DetalhesJogadorComponent,
    PerguntaComponent,
    RankComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
