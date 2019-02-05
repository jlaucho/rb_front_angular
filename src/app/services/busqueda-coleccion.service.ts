import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BusquedaColeccionService {

  private token: String;

  constructor( private http: HttpClient ) {
    this.token = (JSON.parse(localStorage.getItem('user'))).token;
  }

  buscarRegistro (colleccion: String, id: Number) {
    let url = `${ environment.basePath }/api/v1/buscar/tabulador/${ colleccion }/${ id }`;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${ this.token }`
    });
    return this.http.get( url, { headers } );
  }
}
