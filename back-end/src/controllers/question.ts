import * as mongoose from "mongoose";
import { QuestionModel } from "../models/question";
import { Request, Response } from "express";
import * as HttpStatus from "http-status";

export class QuestionController {
    public addNewQuestion(req: Request, res: Response) {//Salva uma nova questão
        QuestionModel.create(req.body)
            .then(questions => {
                res.status(HttpStatus.CREATED).json(questions);
            })
            .catch( err => {
                if (err) {
                    switch (err.name) {
                        case 'ValidationError':
                            res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
                            break;
                        default:
                            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
                            break;
                    }
                }
            });  
    }

    public getQuestionAll(req: Request, res: Response) {//Retorna todas as questoes
        let filter: any = {}
        if (req.query.area)
            filter.area = req.query.area
        if(req.query.level)
            filter.level = req.query.level 
        QuestionModel.find(filter).exec((err, questions) => {
            if (err) {
                res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
            }
            res.status(HttpStatus.OK).json(questions);
        });
    }

    public getQuestionId(req: Request, res: Response) {//Retorna uma questão pelo id
        QuestionModel.findById({ _id: req.params.questionId }).exec((err, question) => {
            if (err) {
                res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
            }
            res.status(HttpStatus.OK).json(question);
        });
    }

    public updateQuestion(req: Request, res: Response) {//Atualiza uma questão
        QuestionModel.findOneAndUpdate({ _id: req.params.questionId }, req.body, { new: true }, (err, question) => {
            if (err) {
                res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
            }
            res.status(HttpStatus.OK).json(question);
        });
    }

    public deleteQuestion(req: Request, res: Response) {//Delata uma questão pelo id
        QuestionModel.deleteOne({ _id: req.params.questionId }, (err) => {
            if (err) {
                res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
            }
            res.status(HttpStatus.NO_CONTENT).send();
        });
    }

}