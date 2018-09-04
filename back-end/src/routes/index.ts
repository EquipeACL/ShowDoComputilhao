import * as express from "express";
import { RoutesQuestion } from "./question";
import { RoutesMatch } from "./match";

export class Routes {
    public routesQuestion: RoutesQuestion;
    public routesMatch: RoutesMatch;

    public routes(app): void {
        this.routesQuestion = new RoutesQuestion(app);
        this.routesMatch = new RoutesMatch(app);
    }

}