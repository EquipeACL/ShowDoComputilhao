import * as express from "express";
import { MatchController } from "../controllers/match";
import { MatchModel } from "../models/match";

export class RoutesMatch {

    public app: express.Application;
    public matchController: MatchController
    private prefix: string;

    constructor(app: express.Application, prefix: string) {
        this.app = app;
        this.prefix = prefix;
        this.matchController = new MatchController();
        this.routes();
    }
    public routes(): void {
        this.app.route(this.prefix+'matchs')
            .get(this.matchController.getMatchsAll)
            .post(this.matchController.addNewMatch);

        this.app.route(this.prefix+'matchs/:matchId')
            .get(this.matchController.getMatchId)
            .delete(this.matchController.deleteMatch)
            .put(this.matchController.updateMatch)

    }

}