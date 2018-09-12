import * as express from "express";
import { MatchController } from "../controllers/match";
import { MatchModel } from "../models/match";

export class RoutesMatch {

    public app: express.Application;
    public matchController: MatchController

    constructor(app: express.Application) {
        this.app = app;
        this.matchController = new MatchController();
        this.routes();
    }
    public routes(): void {
        this.app.route('/matchs')
            .get(this.matchController.getMatchsAll)
            .post(this.matchController.addNewMatch);

        this.app.route('/matchs/:matchId')
            .get(this.matchController.getMatchId)
            .delete(this.matchController.deleteMatch)
            .put(this.matchController.updateMatch)

    }

}