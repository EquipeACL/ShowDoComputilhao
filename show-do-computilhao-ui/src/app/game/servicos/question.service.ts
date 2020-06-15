import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from '../../../environments/environment';

export interface IQuestion {
  id?: string
  statement: string
  area: string
  options: Array<String>
  links: Array<String>
  level: string
  correctOption: string
  comment: string
}
@Injectable()
export class QuestionService {

 
  constructor(private http: Http) { }

  buscarTodas(filters: any): Promise<any> {
    return this.http.get(environment.urlAPI + '/game/1', { headers: filters })
      .toPromise()
      .then((response) => response.json())
      .catch((err) => {
        return Promise.reject(err);
      });
  }

}





