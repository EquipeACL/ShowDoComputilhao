import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { DetalhesJogadorComponent } from './game/detalhes-jogador/detalhes-jogador.component';
import { PerguntaComponent } from './game/pergunta/pergunta.component';
import { RankComponent } from './game/rank/rank.component';
import { AdminModule } from './admin/admin.module';
import { CronometroComponent } from './game/cronometro/cronometro.component';
import { CronometroService } from './game/cronometro/cronometro-service.service';

const rotas: Routes = [
  {path:'',component:HomeComponent},
  {path:'rank',component:RankComponent},
  {path:'game',component:PerguntaComponent},
  {path:'detalhes',component:DetalhesJogadorComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    DetalhesJogadorComponent,
    PerguntaComponent,
    RankComponent,
    CronometroComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AdminModule,
    RouterModule.forRoot(
      rotas
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [CronometroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
