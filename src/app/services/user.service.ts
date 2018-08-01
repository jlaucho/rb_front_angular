import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { User } from '../interfaces/user';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable()
export class UserService {

  constructor( private _http: HttpClient ) { }

  storageUser( data) {
    let user = {
      token: data.token,
      token_type: data.token_type,
      user: {
        name: data.user.name,
        apellido: data.user.apellido,
        email: data.user.email
      }
    };
    localStorage.setItem('user', JSON.stringify( user ));
  }

  loginUser( user: Login ) {
    let url = `${ environment.basePath }/api/v1/auth/login`;
    return this._http.post( url, user );
  }
  registerUser( user: User ) {
    let url = `${ environment.basePath }/api/v1/user/store`;
    return this._http.post( url, user );
  }
  listaUser () {
    let url = `${ environment.basePath }/api/v1/user`;
    let token =  (JSON.parse(localStorage.getItem('user'))).token;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // headers.append('Authorization', `Bearer ${token}`);
    console.log( headers );
    return this._http.get(url, {headers});
  }
}
