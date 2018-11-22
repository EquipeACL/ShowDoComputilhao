import { ReviewController } from "../controllers/review";
import * as express from "express";

export class RoutesReview {
    public app: express.Application;
    public controller: ReviewController
    private prefix: string;
    
    constructor(app: express.Application, prefix: string) {
        this.app = app;
        this.prefix = prefix;
        this.controller = new ReviewController();
        this.routes();
    }
    public routes(): void {
        this.app.route(this.prefix + 'reviews')
            .get(this.controller.getReviewsAll)
            .post(this.controller.addNewReview);
        this.app.route(this.prefix+'reviews/:reviewId')
            .get(this.controller.getReviewId)
            .delete(this.controller.deleteReview)
            .put(this.controller.updateReview)
    }

}