import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class ValidatorsService {

  constructor( private http: HttpClient ) { }

  emailTaken( email: string ) {
    let url = `${ environment.basePath }/api/v1/validators/emailtaken/${ email }`;

    return this.http.get( url );
  }

}
