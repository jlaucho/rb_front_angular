import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { User } from '../interfaces/user';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable()
export class UserService {
  tokenValid: boolean = false;
  constructor( private _http: HttpClient ) {
    if(this.isLogued()){
      this.me();
    }
   }

  storageUser( data ) {
    let user = {
      token: data.token,
      token_type: data.token_type,
      expired_in: data.expire_in,
      user: {
        name: data.user.name,
        apellido: data.user.apellido,
        email: data.user.email
      }
    };

    localStorage.setItem('user', JSON.stringify( user ));
  }

  me(): void {
    let url = `${ environment.basePath }/api/v1/auth/me`;
    let token =  (JSON.parse(localStorage.getItem('user'))).token;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${ token }`
    });
    
    this._http.post(url, null, {headers})
        .subscribe( (resp: any) => {
          this.tokenValid = true;
        }, (error: any) => {
          this.tokenValid = false;;
        });
  }

  isLogued(): boolean {
    return (localStorage.getItem('user') ) ? true : false;
  }

  loginUser( user: Login ) {
    let url = `${ environment.basePath }/api/v1/auth/login`;
    return this._http.post( url, user );
  }
  registerUser( user: User ) {
    let url = `${ environment.basePath }/api/v1/user/store`;
    return this._http.post( url, user );
  }
  listaUser ( parametro: string, page: string = '', palabra ) {
    let token =  (JSON.parse(localStorage.getItem('user'))).token;
    let url = `${ environment.basePath }/api/v1/user/${ parametro }/${palabra}${ page }`;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.get(url, {headers});

    // Respuesta con generados de JSON
    // let url = `https://next.json-generator.com/api/json/get/4y4RJN2VB`;
    // return this._http.get(url);
  }
  userRegister() {
    let url = `${ environment.basePath }/api/v1/user/userRegister`;
    let token =  (JSON.parse(localStorage.getItem('user'))).token;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._http.get(url, {headers});
  }
  buscarUser( id: number ) {
    let token =  (JSON.parse(localStorage.getItem('user'))).token;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    let url = `${ environment.basePath }/api/v1/buscar/usuario/${ id }`;

    return this._http.get( url, { headers } );
  }
  actualizarUser( id: number, body: Object ) {
    let url = `${ environment.basePath }/api/v1/user/${ id }`;
    let token =  (JSON.parse(localStorage.getItem('user'))).token;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return  this._http.put( url, body, { headers } );
  }

  borrarUser( id: number ) {
    let url = `${ environment.basePath }/api/v1/user/${ id }`;
    let token =  (JSON.parse(localStorage.getItem('user'))).token;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return  this._http.delete( url, { headers } );
  }

  reactivarUser( id: number ) {
    let body = { id };
    let url = `${ environment.basePath }/api/v1/user/reactivar`;
    let token =  (JSON.parse(localStorage.getItem('user'))).token;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return  this._http.post( url, body, { headers } );
  }

  userCliente() {
    let url = `${ environment.basePath }/api/v1/user/usuarios`;
    let token =  (JSON.parse(localStorage.getItem('user'))).token;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return  this._http.get( url, { headers } );
  }

  userConductores() {
    let url = `${ environment.basePath }/api/v1/user/conductores`;
    let token =  (JSON.parse(localStorage.getItem('user'))).token;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return  this._http.get( url, { headers } );
  }

  irA( index: number ) {
    let url = `${ environment.basePath }/api/v1/user/activos?page=${ index }`;
    let token =  (JSON.parse(localStorage.getItem('user'))).token;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return  this._http.get( url, { headers } );
  }

  nexPage( url: string ) {
    return url;
  }

}
