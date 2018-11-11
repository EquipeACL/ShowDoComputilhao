import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.css']
})
export class MetricasComponent implements OnInit {
  // Radar
  public radarChartLabels: string[];
  public radarChartData: any;
  public radarChartType: string;

  totalDeTodasQuestoes: number = 0;
  totalDeQuestoesCertas: number = 0;

  @Input() performance: any;
  @Output() close = new EventEmitter();
  constructor() { }

  ngOnInit() {
    
    // Config grafico Radar
    this.radarChartLabels = ['Matemática', 'Fundamentos', 'Tecnologias', "Faceis", "Médias", "Dificeis"];
    this.radarChartData = [
      { data: [this.performance['matematica']['todas'], this.performance['fundamentos']['todas'], this.performance['tecnologia']['todas'],this.performance['low']['todas'],this.performance['medium']['todas'],this.performance['high']['todas']], label: 'Total de questões' },
      { data: [this.performance['matematica']['certas'], this.performance['fundamentos']['certas'], this.performance['tecnologia']['certas'],this.performance['low']['certas'],this.performance['medium']['certas'],this.performance['high']['certas']], label: 'Questões certas' }
    ];
    this.radarChartType = 'radar';
    this.totalDeTodasQuestoes = this.performance['low']['todas']+this.performance['medium']['todas']+this.performance['high']['todas'];
    this.totalDeQuestoesCertas = this.performance['low']['certas']+this.performance['medium']['certas']+this.performance['high']['certas'];
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  clicouFechar() {
    this.close.emit();
  }
}
