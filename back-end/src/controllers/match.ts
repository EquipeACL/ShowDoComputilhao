import * as mongoose from "mongoose";
import { MatchModel } from "../models/match";
import { Request, Response } from "express";
import * as HttpStatus from "http-status";

export class MatchController {
    public addNewMatch(req: Request, res: Response) {//Salva uma nova partida
        let newMatch = new MatchModel(req.body);

        newMatch.save((err, match) => {
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
            res.status(HttpStatus.CREATED).json(match);
        });

    }

    public getMatchsAll(req: Request, res: Response) {//Retorna todas as partidas

        MatchModel.find({}).exec((err, matchs) => {
            if (err) {
                res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
            }
            res.status(HttpStatus.OK).json(matchs);
        });
    }

    public getMatchId(req: Request, res: Response) {//Retorna uma partida pelo id
        MatchModel.findById({ _id: req.params.matchId }).exec((err, match) => {
            if (err) {
                res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
            }
            res.status(HttpStatus.OK).json(match);
        });
    }

    public updateMatch(req: Request, res: Response) {//Atualiza uma partida
        MatchModel.findOneAndUpdate({ _id: req.params.matchId }, req.body, { new: true }, (err, match) => {
            if (err) {
                res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
            }
            res.status(HttpStatus.OK).json(match);
        });
    }

    public deleteMatch(req: Request, res: Response) {//Delata uma partida pelo id
        MatchModel.deleteOne({ _id: req.params.matchId }, (err) => {
            if (err) {
                res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
            }
            res.status(HttpStatus.NO_CONTENT).send();
        });
    }

}