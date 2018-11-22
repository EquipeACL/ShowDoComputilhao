import { ReviewModel } from '../models/review'
import { Request, Response } from "express";
import * as HttpStatus from "http-status";

export class ReviewController {

    public addNewReview(req: Request, res: Response) {
        ReviewModel.create(req.body)
            .then(review => {
                res.status(HttpStatus.CREATED).json(review);
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

    public getReviewsAll(req: Request, res: Response) {
        return ReviewModel.find()
            .exec((err, reviews) => {
            if (err) res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
            else res.status(HttpStatus.OK).send(reviews);
        });       
        
    }

    public getReviewId(req: Request, res: Response) {
        return ReviewModel.findById({ _id: req.params.reviewId }).exec((err, review) => {
            if (err) res.status(HttpStatus.BAD_REQUEST).send(err);
            else res.status(HttpStatus.OK).send(review);
        });
    }

    public updateReview(req: Request, res: Response) {
        return ReviewModel.findOneAndUpdate({ _id: req.params.reviewId }, req.body, { new: true }, (err, review) => {
            if (err) res.status(HttpStatus.BAD_REQUEST).send(err);
            else res.status(HttpStatus.OK).send(review);
        });
    }

    public deleteReview(req: Request, res: Response) {
        return ReviewModel.deleteOne({ _id: req.params.reviewId }, (err) => {
            if (err) res.status(HttpStatus.BAD_REQUEST).send(err);
            else res.status(HttpStatus.NO_CONTENT).send();
        });
    }
}