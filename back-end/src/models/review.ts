import * as mongoose from "mongoose";

const Schema = mongoose.Schema;


export interface IReview extends mongoose.Document {
    comment: string,
    question: Object
}

const ReviewSchema = new Schema({
    comment: {
        type: String,
        required: 'Comment is required!'
    },
    question: {
        type: Object,
        required: "Question is required!"
    }
})

export const ReviewModel = mongoose.model<IReview>('Review', ReviewSchema)