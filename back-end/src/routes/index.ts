import * as express from "express";
import { RoutesQuestion } from "./question";
import { RoutesMatch } from "./match";
import { RoutesGame } from "./game";
import { RoutesComment } from './comment';
import { RoutesReview } from './review'

export class Routes {
    public routesQuestion: RoutesQuestion;
    public routesMatch: RoutesMatch;
    public routesGame: RoutesGame;
    public routesComment: RoutesComment;
    public routesReview: RoutesReview;
    
    prefix = '/api/';

    public routes(app): void {
        app.route('/')
            .get((req,res)=>{
                return res.send('API funcionando corretamente!');
            });
        this.routesQuestion = new RoutesQuestion(app, this.prefix);
        this.routesMatch = new RoutesMatch(app, this.prefix);
        this.routesGame = new RoutesGame(app, this.prefix);
        this.routesComment = new RoutesComment(app, this.prefix);
        this.routesReview = new RoutesReview(app,this.prefix);
    }

}