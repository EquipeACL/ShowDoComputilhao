import * as mongoose from "mongoose";
import { MatchModel, IMatch } from "../models/match";
import { Request, Response } from "express";
import * as HttpStatus from "http-status";

export class MatchController {
    
    public addNewMatch(req: Request, res: Response) {//Salva uma nova partida
        
        if(JSON.stringify(req.body) === '{}'){
            return function (){res.status(HttpStatus.BAD_REQUEST).send("Error! Body empty.")}();
        }

        let newMatch = new MatchModel(req.body);

        return newMatch.save((err, match) => {
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
            else res.status(HttpStatus.CREATED).send(match);
        });

    }

    public getMatchsAll(req: Request, res: Response) {//Retorna todas as partidas
        let skip = req.query.skip | 0;
        let limit = req.query.limit | 0;
        console.log(`LIMIT: ${limit}`);
        let sort = { "hits":"desc", "cards":"asc","universitaries":"asc","plates":"asc", "skips":"asc", "data": "asc"}
        return MatchModel.find()
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec((err, matchs) => {
            if (err) res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
            else res.status(HttpStatus.OK).send(matchs);
        });
    }

    public getMatchId(req: Request, res: Response) {//Retorna uma partida pelo id
        return MatchModel.findById({ _id: req.params.matchId }).exec((err, match) => {
            if (err) res.status(HttpStatus.BAD_REQUEST).send(err);
            else res.status(HttpStatus.OK).send(match);
        });
    }

    public updateMatch(req: Request, res: Response) {//Atualiza uma partida
        return MatchModel.findOneAndUpdate({ _id: req.params.matchId }, req.body, { new: true }, (err, match) => {
            if (err) res.status(HttpStatus.BAD_REQUEST).send(err);
            else res.status(HttpStatus.OK).send(match);
        });
    }

    public deleteMatch(req: Request, res: Response) {//Delata uma partida pelo id
        return MatchModel.deleteOne({ _id: req.params.matchId }, (err) => {
            if (err) res.status(HttpStatus.BAD_REQUEST).send(err);
            else res.status(HttpStatus.NO_CONTENT).send();
        });
    }

}