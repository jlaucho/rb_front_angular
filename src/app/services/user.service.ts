import { Injectable } from '@angular/core';
import { Login, User } from '../interfaces/login';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable()
export class UserService {

  constructor( private _http: HttpClient ) { }

  storageUser( user: User) {
   localStorage.setItem('user', JSON.stringify( user ));
  }

  loginUser( user: Login ) {
    let url = `${ environment.basePath }/api/v1/auth/login`;
    return this._http.post( url, user );
  }
}
