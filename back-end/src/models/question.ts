import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IQuestion extends mongoose.Document {

    id?: string
    statement: string
    area: string
    options: Array<String>
    links: Array<String>
    correctOption: string 
}

const QuestionSchema = new Schema({
    id: {
        type: String
    },
    statement:{
        type: String,
        required: 'Enter the statement!'
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
    }
})

export const QuestionModel = mongoose.model<IQuestion>('Question', QuestionSchema)

