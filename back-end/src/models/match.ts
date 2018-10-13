import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IMatch extends mongoose.Document {
    
    player: string
    score: number 
    data: Date 
    hits: number
    skips: number
    universitaries: number 
    cards: number
    plates: number 
    performance: Object

}

const MatchSchema = new Schema({
    
    player: {
        type: String,
        required: "Enter the name of player"
    },
    score: {
        type: Number,
        required: "Enter the user score"
    },
    data: {
        type: Date,
        required: "Enter the data of match"
    },
    hits: {
        type: Number,
        required: "Enter the number of hits"
    },
    skips: {
        type: Number,
        required: "Enter the number of skips"
    },
    universitaries: {
        type: Number,
        required: "Enter the number of universitaries"
    },
    cards: {
        type: Number,
        required: "Enter the number of cards"
    },
    plates: {
        type: Number,
        required: "Enter the number of plates"
    },
    performance: {
        type: Object,
        required: "Enter the levels performance"
    }
   
})

export const MatchModel = mongoose.model<IMatch>('Match', MatchSchema)

