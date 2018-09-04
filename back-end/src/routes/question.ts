import { QuestionController } from "../controllers/question";
import * as express from "express";

export class RoutesQuestion {
    public app: express.Application; 
    public questionController: QuestionController
    
    constructor(app: express.Application) {
        this.app = app;
        this.questionController = new QuestionController();
        this.routes(app);
    }
    public routes(app): void {
        app.route('/questions')
            .get(this.questionController.getQuestionAll)
            .post(this.questionController.addNewQuestion);

        app.route('/questions/:questionId')
            .get(this.questionController.getQuestionId)
            .delete(this.questionController.deleteQuestion)
            .put(this.questionController.updateQuestion);
    }

}