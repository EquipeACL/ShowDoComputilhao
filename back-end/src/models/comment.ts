import * as mongoose from "mongoose";

const Schema = mongoose.Schema;


export interface IComment extends mongoose.Document {
    name: string,
    email?: string,
    comment: string
}

const CommentSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required!'
    },
    email: { type: String },
    comment: {
        type: String,
        required: 'Comment is required!'
    }
})

export const CommentModel = mongoose.model<IComment>('Comment', CommentSchema)