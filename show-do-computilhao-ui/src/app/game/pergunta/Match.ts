export interface IMatch{

    _id?: string
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

export class Match implements IMatch{
    _id: string;
    player: string = '';
    score: number = 0;
    data: Date = new Date();
    hits: number = 0;
    skips: number = 0;
    universitaries: number = 0;
    cards: number = 0;
    plates: number = 0;
    performance: Object = {};
    
    setId(id: string) {
        this._id = id;
    }
    setPlayer(player: string){
        this.player = player;
    }
}