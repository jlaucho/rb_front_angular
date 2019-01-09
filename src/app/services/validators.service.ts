import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';



@Injectable()
export class ValidatorsService {

  constructor( private _http: HttpClient ) { }

  emailTaken( email: string ): Observable<any> {
    let token = (JSON.parse(localStorage.getItem('user'))).token;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${ token }`
    });
    let url = `${ environment.basePath }/api/v1/validators/emailtaken/${ email }`;
    return this._http.get( url, {headers} );
  }

  existe ( campo: string, valor: string ): any {
    // console.log( rif );
    let url = `${ environment.basePath }/api/v1/validators/empresaexiste/${campo}/${valor}`;
    // console.log(url);
    let token = (JSON.parse(localStorage.getItem( 'user' ))).token;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${ token }`
    });
    return this._http.get( url, { headers } );
  }

}
