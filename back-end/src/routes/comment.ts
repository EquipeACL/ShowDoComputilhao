import { CommentController } from "../controllers/comment";
import * as express from "express";

export class RoutesComment {
    public app: express.Application;
    public controller: CommentController
    private prefix: string;
    constructor(app: express.Application, prefix: string) {
        this.app = app;
        this.prefix = prefix;
        this.controller = new CommentController();
        this.routes(app);
    }
    public routes(app): void {
        app.route(this.prefix + 'comments')
            .post(this.controller.addNewComment);
    }

}