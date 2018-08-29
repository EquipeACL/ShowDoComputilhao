import {Request,Response} from "express";
import {QuestionController} from "../controllers/question";
import { NextFunction } from "express-serve-static-core";
import * as HttpStatus from "http-status";

export class Routes{
    
    public questionController: QuestionController = new QuestionController();
    public routes(app):void{
        app.route('/questions')
        .get(this.questionController.getQuestionAll)

        .post(this.questionController.addNewQuestion);

        
        app.route('/questions/:questionId')
        .get(this.questionController.getQuestionId)

        .delete(this.questionController.deleteQuestion)

        .put(this.questionController.updateQuestion)
    }
}