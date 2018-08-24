import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tabulador } from '../interfaces/tabulador';
import { UrlHandlingStrategy } from '@angular/router';



@Injectable()
export class TabuladorService {

  token: string;

  constructor(
    private http: HttpClient
  ) {
    this.token = (JSON.parse(localStorage.getItem('user'))).token;
  }

  store ( tabulador: Tabulador ) {
    let url = `${ environment.basePath }/api/v1/tabulador`;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${ this.token }`
    });
    return this.http.post( url, tabulador, { headers } );
  }

  obtenerLista ( parametro: string ) {
    let url = `${ environment.basePath }/api/v1/buscar/tabulador/${ parametro }`;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${ this.token }`
    });
    return this.http.get( url, { headers } );
  }

  borrarTabulador ( id: number ): void {
    console.log( id );
  }

  reactivarTabulador ( id: number ): void {
    console.log( id );
  }
}
