import * as express from "express";
import { RoutesQuestion } from "./question";
import { RoutesMatch } from "./match";
import {RoutesGame} from "./game";

export class Routes {
    public routesQuestion: RoutesQuestion;
    public routesMatch: RoutesMatch;
    public routesGame: RoutesGame;
    prefix = '/api/';

    public routes(app): void {
        this.routesQuestion = new RoutesQuestion(app, this.prefix);
        this.routesMatch = new RoutesMatch(app, this.prefix);
        this.routesGame = new RoutesGame(app, this.prefix);
    }

}