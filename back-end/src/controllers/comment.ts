import { CommentModel } from '../models/comment'
import { Request, Response } from "express";
import * as HttpStatus from "http-status";

export class CommentController {

    public addNewComment(req: Request, res: Response) {
        CommentModel.create(req.body)
            .then(comment => {
                res.status(HttpStatus.CREATED).json(comment);
            })
            .catch(err => {
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
}