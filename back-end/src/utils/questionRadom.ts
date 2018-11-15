import { QuestionModel, IQuestion } from "../models/question";
/**
 * Classe de auxilio, utilizada para selecionar questoes de forma aleatoria
 */
export class QuestionRandom{

    /**
     * Função para retorna questoes aleatoria, dado a quantidade;
     * @param questions Array com todas as questoes
     * @param quantity Quantidade de questoes desejadas
     */
    public selectRadom(questions: IQuestion[],quantity):IQuestion[]{
        let indexesIncluded: number[] = [];
        let listReturn: IQuestion[] = [];
        for(let i=0; i<quantity;i++){
            let index = this.getRandomIntInclusive(0,questions.length-1);
            
            while(indexesIncluded.find((value)=>{return value===index}) !== undefined){//Encontrar um indece que ainda não foi sorteado
                index = this.getRandomIntInclusive(0,questions.length-1);;
            }
            listReturn.push(questions[index]);
            indexesIncluded.push(index);
            
        }
        return listReturn;
    }

    /**
     * Função para retornar um indece aleatorio dentro de um intervalo
     * @param min Menor valor do intervalo
     * @param max Maior valor do intervalo
     */
    public getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

}
export default new QuestionRandom();