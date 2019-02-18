import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class ServiciosService {

  token: string;
  usuarios: any;
  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.token = (JSON.parse(localStorage.getItem('user'))).token;
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${ this.token }`
    });

  }
registrarServicio ( servicio: any ) {
  let url = `${ environment.basePath }/api/v1/servicio/store`;
  return this.http.post( url, servicio, { headers: this.headers } );
}

listaServicio ( parametro: string ) {
  let url = `${ environment.basePath }/api/v1/servicio/${ parametro }`;
  return this.http.get( url, {headers: this.headers} );
}

showServicio( idServicio: number ) {
  let url = `${ environment.basePath }/api/v1/buscar/servicio/${ idServicio }`;
  return this.http.get( url, {headers: this.headers} );
}

deleteServicio( idServicio: number ) {
  let url = `${ environment.basePath }/api/v1/servicio/${ idServicio }`;
  return this.http.delete( url, {headers: this.headers} );
}

}
