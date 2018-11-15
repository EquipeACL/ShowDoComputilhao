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
        const QUANT_LOW = 15;
        const QUANT_MEDIUM = 9;
        const QUANT_HIGH = 9;
        let result = [];
        let skips = [];
        let temp = [];
        if (req.headers['matematica'] === 'true') {
            temp.push({ area: "matematica" });
        }
        if (req.headers['fundamentos'] === 'true') {
            temp.push({ area: "fundamentos" });
        }
        if (req.headers['tecnologias'] === 'true') {
            temp.push({ area: "tecnologia" });
        }

        let filter: any = {
            "level": "low",
            $or: temp
        }

        QuestionModel.find(filter).exec((err, questions) => {
            if (err) {
                res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
            }
            let list: IQuestion[] = QuestionRandom.selectRadom(questions, QUANT_LOW);
            let i = 0;
            list.forEach(elem => {
                if(i < QUANT_LOW - 3){
                    result.push(elem);
                }else{
                    skips.push(elem);
                }
                i++;
            })
            filter.level = "medium"
            QuestionModel.find(filter).exec((err, questions) => {
                if (err) {
                    res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
                }
                let list: IQuestion[] = QuestionRandom.selectRadom(questions,QUANT_MEDIUM);
                i = 0;
                list.forEach(elem => {
                    if(i < QUANT_MEDIUM - 3){
                        result.push(elem);
                    }else{
                        skips.push(elem);
                    }
                    i++;
                })
                filter.level = "high";
                QuestionModel.find(filter).exec((err, questions) => {
                    if (err) {
                        res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
                    }                    
                    let list: IQuestion[] = QuestionRandom.selectRadom(questions, QUANT_HIGH);
                    i=0;
                    list.forEach(elem => {
                        if(i < QUANT_HIGH - 3){
                            result.push(elem);
                        }else{
                            skips.push(elem);
                        }
                        i++;
                    })                    
                    res.status(HttpStatus.OK).json({result,skips});
                });
            });
        });


    }

   
    /**
     * A ideia é retornar todas as 6 perguntas do segundo modulo
     * @param req 
     * @param res 
     */
    public getModule2(req: Request, res: Response) {
        let temp = [];
        if (req.headers['matematica']) {
            temp.push({ area: "matematica" });
        }
        if (req.headers['fundamentos']) {
            temp.push({ area: "fundamentos" });
        }
        if (req.headers['tecnologias']) {
            temp.push({ area: "tecnologia" });
        }

        let filter: any = {
            "level": "medium",
            $or: temp
        }

        QuestionModel.find(filter).exec((err, questions) => {
            if (err) {
                res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
            }
            let list = QuestionRandom.selectRadom(questions, 6);
            res.status(HttpStatus.OK).json(list);
        });
    }

    /**
     * A ideia é retornar todas as 6 perguntas do terceiro modulo
     * @param req 
     * @param res 
     */
    public getModule3(req: Request, res: Response) {
        let temp = [];
        if (req.headers['matematica']) {
            temp.push({ area: "matematica" });
        }
        if (req.headers['fundamentos']) {
            temp.push({ area: "fundamentos" });
        }
        if (req.headers['tecnologias']) {
            temp.push({ area: "tecnologia" });
        }

        let filter: any = {
            "level": "high",
            $or: temp
        }

        QuestionModel.find(filter).exec((err, questions) => {
            if (err) {
                res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
            }
            let list = QuestionRandom.selectRadom(questions, 6);
            res.status(HttpStatus.OK).json(list);
        });
    }

}