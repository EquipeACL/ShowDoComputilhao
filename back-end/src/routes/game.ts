import * as express from "express";
import { GameController } from "../controllers/game";


export class RoutesGame {

    public app: express.Application;
    public gameController: GameController
    private prefix: string;

    constructor(app: express.Application, prefix: string) {
        this.app = app;
        this.prefix = prefix;
        this.gameController = new GameController();
        this.routes();
    }
    public routes(): void {
        this.app.route(this.prefix+'game/1')//Retorna 12 questoes do primerio modulo
            .get(this.gameController.getModule1);
        
        this.app.route(this.prefix+'game/2')//Retorna 6 questoes do segundo modulo
            .get(this.gameController.getModule2);
        
        this.app.route(this.prefix+'game/3')//Retorna 6 questoes do terceiro modulo
            .get(this.gameController.getModule3);
    }

}