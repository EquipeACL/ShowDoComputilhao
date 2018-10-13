import { QuestionModel, IQuestion } from "../models/question";
import QuestionRandom from "../utils/questionRadom";
import { Request, Response } from "express";
import * as HttpStatus from "http-status";

export class GameController {

    /**
     * A ideia é retornar as 12 perguntas do primeiro modulo
     * @param req 
     * @param res 
     */
    public getModule1(req: Request, res: Response) {
        let filter: any = {
            "level":"C"
        }
        if (req.query.area)
            filter.area = req.query.area
        QuestionModel.find(filter).exec((err, questions) => {
            if (err) {
                res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
            }
            let list: IQuestion[] = QuestionRandom.selectRadom(questions,2);
            res.status(HttpStatus.OK).json(list);
        });
       
    }

    /**
     * A ideia é retornar todas as 6 perguntas do segundo modulo
     * @param req 
     * @param res 
     */
    public getModule2(req: Request, res: Response) {
        let filter: any = {
            "level":"B"
        }
        if (req.query.area)
            filter.area = req.query.area
        
        QuestionModel.find(filter).exec((err, questions) => {
            if (err) {
                res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
            }
            let list = QuestionRandom.selectRadom(questions,2);
            res.status(HttpStatus.OK).json(list);
        });
    }

    /**
     * A ideia é retornar todas as 6 perguntas do terceiro modulo
     * @param req 
     * @param res 
     */
    public getModule3(req: Request, res: Response) {
        let filter: any = {
            "level":"A"
        }
        if (req.query.area)
            filter.area = req.query.area
        
        QuestionModel.find(filter).exec((err, questions) => {
            if (err) {
                res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
            }
            let list = QuestionRandom.selectRadom(questions,2);
            res.status(HttpStatus.OK).json(list);
        });
    }

}