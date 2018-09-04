import * as express from "express";
import { RoutesQuestion } from "./question";
import { RoutesMatch } from "./match";
import {RoutesGame} from "./game";

export class Routes {
    public routesQuestion: RoutesQuestion;
    public routesMatch: RoutesMatch;
    public routesGame: RoutesGame;

    public routes(app): void {
        this.routesQuestion = new RoutesQuestion(app);
        this.routesMatch = new RoutesMatch(app);
        this.routesGame = new RoutesGame(app);
    }

}