import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from '../../../environments/environment';
import { IMatch } from '../pergunta/Match';

@Injectable()
export class MatchService {

    constructor(private http: Http) { }

    buscarTodas(skip: number, limit: number): Promise<any> {
        return this.http.get(environment.urlAPI + '/matchs?skip='+skip+'&&limit='+limit)
            .toPromise()
            .then((response) => response.json())
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    buscar(id: string): Promise<any> {
        return this.http.get(environment.urlAPI + '/matchs/' + id)
            .toPromise()
            .then((response) => response.json())
            .catch((err) => {
                return Promise.reject(err);
            });
    }
    salvar(match: IMatch): Promise<any> {
        return this.http.post(environment.urlAPI + '/matchs', match)
            .toPromise()
            .then(response => response.json())
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    atualizar(match: any): Promise<any> {
        return this.http.put(environment.urlAPI + '/matchs/' + match._id, match)
            .toPromise()
            .then(response => response.json())
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    deletar(id: string): Promise<any> {
        return this.http.delete(environment.urlAPI + '/matchs/' + id)
            .toPromise()
            .then(response => response.json())
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    
}
