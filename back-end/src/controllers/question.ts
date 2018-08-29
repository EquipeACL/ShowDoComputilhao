import * as mongoose from  "mongoose";
import {QuestionSchema} from "../models/question";
import {Request,Response} from "express";
import * as HttpStatus from "http-status";

const Question = mongoose.model('Contact',QuestionSchema);

export class QuestionController{
    public addNewQuestion(req:Request,res:Response){//Salva uma nova questão
        let newQuestion = new Question(req.body);
                
        newQuestion.save((err,contact)=>{
            if(err){
               switch(err.name) {
                   case 'ValidationError':
                        res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
                        break;
                    default:
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
                        break;
               }
            }
            res.status(HttpStatus.CREATED).json(contact);
        });
        
    }

    public getQuestionAll(req:Request, res:Response){//Retorna todas as questoes
        Question.find({}).exec((err,questions)=>{
            if(err){
                res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
            }
            res.status(HttpStatus.OK).json(questions);
        });
    }

    public getQuestionId(req:Request, res:Response){//Retorna uma questão pelo id
        Question.findById({_id:req.params.questionId}).exec((err,question)=>{
            if(err){
                res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
            }
            res.status(HttpStatus.OK).json(question);
        });
    }

    public updateQuestion(req:Request,res:Response){//Atualiza uma questão
        Question.findOneAndUpdate({_id:req.params.questionId},req.body,{new:true},(err,question)=>{
            if(err){
                res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
            }
            res.status(HttpStatus.OK).json(question);
        });
    }

    public deleteQuestion(req:Request,res:Response){//Delata uma questão pelo id
        Question.findOneAndDelete({_id:req.params.questionId},(err,question)=>{
            if(err){
                res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
            }
            res.status(HttpStatus.NO_CONTENT).send();
        });
    }
    
}