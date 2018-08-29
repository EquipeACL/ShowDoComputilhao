import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const QuestionSchema = new Schema({
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
});

