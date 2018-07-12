import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { HttpClient } from '@angular/common/http';
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
    // tslint:disable-next-line:semicolon
    }
    localStorage.setItem('user', JSON.stringify( user ));
  }

  loginUser( user: Login ) {
    let url = `${ environment.basePath }/api/v1/auth/login`;
    return this._http.post( url, user );
  }
}
