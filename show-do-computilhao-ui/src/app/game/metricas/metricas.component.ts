import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.css']
})
export class MetricasComponent implements OnInit {
  // Radar
  public doughnutChartAreasLabels: string[];
  public doughnutChartAreasData: any;
  public doughnutChartAreasType: string;

  public doughnutChartDificuldadeLabels: string[];
  public doughnutChartDificuldadeData: any;
  public doughnutChartDificuldadeType: string;

  totalDeTodasQuestoes: number = 0;
  totalDeQuestoesCertas: number = 0;

  @Input() performance: any;
  @Output() close = new EventEmitter();
  constructor() { }

  ngOnInit() {

    // Config grafico Radar
    this.doughnutChartAreasLabels = ['Matemática', 'Fundamentos', 'Tecnologia'];
    this.doughnutChartDificuldadeLabels = ['Fácil', 'Mediana', 'Difícil'];
    this.doughnutChartAreasData = [
      {
        data: [
          this.performance['matematica']['certas'],
          this.performance['fundamentos']['certas'],
          this.performance['tecnologia']['certas'],
        ]
      }
    ];
    this.doughnutChartDificuldadeData = [
      {
        data: [
          this.performance['low']['certas'],
          this.performance['medium']['certas'],
          this.performance['high']['certas']
        ],
        label: 'Questões certas'
      }
    ];
    this.doughnutChartAreasType = 'doughnut';
    this.doughnutChartDificuldadeType = 'pie';
    this.totalDeTodasQuestoes = this.performance['low']['todas'] + this.performance['medium']['todas'] + this.performance['high']['todas'];
    this.totalDeQuestoesCertas = this.performance['low']['certas'] +
      this.performance['medium']['certas'] +
      this.performance['high']['certas'];
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
