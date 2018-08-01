import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empresa } from '../interfaces/empresa';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class EmpresaService {

  constructor( private _http: HttpClient ) { }

  registerEmpresa ( empresa: Empresa ) {
    let url = `${ environment.basePath }/api/v1/empresa/store`;
    let token =  (JSON.parse(localStorage.getItem('user'))).token;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${ token }`
    });

    return this._http.post( url, empresa, {headers} );
  }

  listarEmpresas () {
    let url = `${ environment.basePath }/api/v1/empresa`;
    let token = (JSON.parse(localStorage.getItem('user'))).token;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${ token }`
    });
    return this._http.get( url, { headers } );
  }

  busqueda( palabra: string ) {
    console.log( palabra );
  }
}
