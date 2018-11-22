import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-solicitar-revisao',
  templateUrl: './solicitar-revisao.component.html',
  styleUrls: ['./solicitar-revisao.component.css']
})
export class SolicitarRevisaoComponent implements OnInit {
  botao: string = 'Enviar';
  comment: string;
  @Input() question;
  @Output() close = new EventEmitter();
  constructor(
    private http: Http
  ) { }

  ngOnInit() { }

  enviar(review: any){ 
    const enviando = setInterval(()=>{
      this.botao += '.';
    },500);
    
    const data = {comment:review.value.comment, question:this.question}
    this.http.post(environment.urlAPI + '/reviews', data)
            .toPromise()
            .then(response => {              
              console.log('Revies adicionando: ',response.json());
              
              setTimeout(()=>{
                clearInterval(enviando);
                this.clicouFechar();
              },500);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
  }

  clicouFechar() {
    this.close.emit();
  }

}
