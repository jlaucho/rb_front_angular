import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  token: String;

  constructor( private http: HttpClient) {
    this.token = (JSON.parse(localStorage.getItem('user'))).token;
  }

  generarFactura(seleccionadas: any){
    let body = seleccionadas;
    let url = `${ environment.basePath }/api/v1/factura/store`;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${ this.token }`
    });
    return this.http.post(url, body, {headers: headers});
  }
}
