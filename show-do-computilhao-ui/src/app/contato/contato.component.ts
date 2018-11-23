import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  botao: string = 'Enviar';
  comment: string;
  name: string;
  email: string;

  sucesso: boolean;
  falha: boolean;
  constructor(
    private http: Http
  ) { }

  ngOnInit() {
  }

  enviar(comment: any) {
    const enviando = setInterval(() => {
      this.botao += '.';
    }, 500);

    const data = comment.value;
    this.http.post(environment.urlAPI + '/comments', data)
      .toPromise()
      .then(response => {
        setTimeout(() => {
          clearInterval(enviando);
          this.botao = 'Enviar';
          this.limpar();
          this.mostrarSucesso();
        }, 500);
      })
      .catch((err) => {
        clearInterval(enviando);
        this.botao = 'Enviar';
        this.mostrarFalha();
        return Promise.reject(err);
      });
  }

  formReset(form:any){
    form.reset();
    this.limpar();
  }

  limpar() {
    this.comment = '';
    this.name = '';
    this.email = "";
  }

  mostrarSucesso() {
    this.sucesso = true;
    setTimeout(() => {
      this.sucesso = false;
    }, 4000);
  }

  mostrarFalha() {
    this.falha = true;
    setTimeout(() => {
      this.falha = false;
    }, 4000);
  }

}
