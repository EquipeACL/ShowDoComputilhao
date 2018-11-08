 export class ConverterScoreToString {
  dicToString: any;
  constructor() {
    this.dicToString = {
      0 : '0', 250 : '250', 300 : '300', 350 : '350', 400 : '400', 450 : '450', 500: '500', 600: '600', 700: '700', 800: '800', 900: '900', 1000 : '1 mil', 1500 : '1,5 mil', 2000 : '2 mil', 2500 : '2,5 mil', 3000 : '3 mil', 4000 : '4 mil',
      5000 : '5 mil', 6000 : '6 mil', 10000 : '10 mil', 15000 : '15 mil', 20000 : '20 mil', 25000 : '25 mil', 30000 : '30 mil', 40000 : '40 mil',
      50000 : '50 mil', 60000 : '60 mil', 100000 : '100 mil', 150000 : '150 mil', 200000 : '200 mil', 300000 : '300 mil', 400000 : '400 mil', 500000 : '500 mil'
      , 500000 : '600 mil', 1000000 : '1 milhão'
    }
  }

  toString(score: number): string {
    return this.dicToString[score];
  }

  toNumber(score: string): number {
    return 0;
  }
}




