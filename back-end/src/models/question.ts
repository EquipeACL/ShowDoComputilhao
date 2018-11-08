import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IQuestion extends mongoose.Document {

    id?: string
    statement: string
    area: string
    img?: string
    options: Array<String>
    links: Array<Object>
    level: string
    correctOption: string 
    comment: string
    year: string
}

const QuestionSchema = new Schema({
    id: {
        type: String
    },
    statement:{
        type: String,
        required: 'Enter the statement!'
    },
    img: {
        type: String
    },
    area: {
        type: String,
        required: 'Enter the area!'
    },
    options:{
        type: Array,
        required: 'Enter options '
    },
    links:{
        type: Array,
        required: 'Insert support links'
    },
    correctOption:{
        type: String,
        required: 'Enter the correct option!'
    }, 
    comment: {
        type: String,
        required: "Enter the comment"
    },
    level: {
        type: String,
        required: "Enter the level of answer"
    },
    year: {
        type: String,
        required: 'Enter the Year of the question'
    }
})

export const QuestionModel = mongoose.model<IQuestion>('Question', QuestionSchema)

