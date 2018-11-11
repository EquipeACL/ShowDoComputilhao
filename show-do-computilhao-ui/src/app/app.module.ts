import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChartsModule } from 'ng4-charts';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { DetalhesJogadorComponent } from './game/detalhes-jogador/detalhes-jogador.component';
import { PerguntaComponent } from './game/pergunta/pergunta.component';
import { RankComponent } from './game/rank/rank.component';
import { AdminModule } from './admin/admin.module';
import { CronometroComponent } from './game/cronometro/cronometro.component';
import { CronometroService } from './game/cronometro/cronometro-service.service';
import { ConfirmacaoComponent } from './game/confirmacao/confirmacao.component';
import { ErroComponent } from './game/feedback/feedback.component';
import { SalvarJogadorComponent } from './game/salvar-jogador/salvar-jogador.component';
import { MatchService } from './game/servicos/match.service';
import { HttpModule } from '@angular/http';
import { CartasComponent } from './game/ajudas/cartas/cartas.component';
import { UniversitariosComponent } from './game/ajudas/universitarios/universitarios.component';
import { PlacasComponent } from './game/ajudas/placas/placas.component';
import { PararJogoComponent } from './game/parar-jogo/parar-jogo.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { PularComponent } from './game/ajudas/pular/pular.component';
import { ValidandoRespostaComponent } from './game/validando-resposta/validando-resposta.component';
import { AreasComponent } from './game/areas/areas.component';
import { QuestionService } from './game/servicos/question.service';
import { ImagemComponent } from './game/imagem/imagem.component';
import { GanhouUmmihaoComponent } from './game/ganhou-ummihao/ganhou-ummihao.component';
import { MetricasComponent } from './game/metricas/metricas.component';


const rotas: Routes = [
  {path:'',component:HomeComponent},
  {path:'rank',component:RankComponent},
  {path:'gameareas',component:AreasComponent},
  {path:'game',component:PerguntaComponent},
  {path:'detalhes/:id',component:DetalhesJogadorComponent},
  {path:'**',component:PaginaNaoEncontradaComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    DetalhesJogadorComponent,
    PerguntaComponent,
    RankComponent,
    CronometroComponent,
    ConfirmacaoComponent,
    ErroComponent,
    SalvarJogadorComponent,
    CartasComponent,
    UniversitariosComponent,
    PlacasComponent,
    PararJogoComponent,
    PaginaNaoEncontradaComponent,
    PularComponent,
    ValidandoRespostaComponent,
    AreasComponent,
    ImagemComponent,
    GanhouUmmihaoComponent,
    MetricasComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AdminModule,
    HttpModule,
    RouterModule.forRoot(
      rotas
      //{ enableTracing: true } // <-- debugging purposes only
    ),
    ChartsModule
  ],
  providers: [CronometroService, MatchService, QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
