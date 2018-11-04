import { QuestionController } from "../controllers/question";
import * as express from "express";

export class RoutesQuestion {
    public app: express.Application; 
    public questionController: QuestionController
    private prefix: string; 
    constructor(app: express.Application, prefix: string) {
        this.app = app;
        this.prefix = prefix;
        this.questionController = new QuestionController();
        this.routes(app);
    }
    public routes(app): void {
        app.route(this.prefix+'questions')
            .get(this.questionController.getQuestionAll)
            .post(this.questionController.addNewQuestion);

        app.route(this.prefix+'questions/:questionId')
            .get(this.questionController.getQuestionId)
            .delete(this.questionController.deleteQuestion)
            .put(this.questionController.updateQuestion);
    }

}