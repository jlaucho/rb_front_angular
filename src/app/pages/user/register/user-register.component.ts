import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { ValidatorsService } from '../../../services/validators.service';
import { Observable } from 'rxjs/Observable';
import { resolve } from 'path';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styles: []
})
export class UserRegisterComponent implements OnInit {

  forma: FormGroup;
  user: User;
  unamePattern = '^[a-zA-Z ]+$';
  ucedulaPattern = '^[0-9]+$';
  caracterMin = 4;
  caracterMax = 25;
  email: string;



   constructor( public _userService: UserService,
               public _validatorsService: ValidatorsService ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      name: new FormControl(null, [Validators.minLength( this.caracterMin ),
                          Validators.maxLength( this.caracterMax ),
                          Validators.required,
                          Validators.pattern(this.unamePattern)]),
      apellido: new FormControl(null, [Validators.minLength(this.caracterMin),
                          Validators.maxLength(this.caracterMax),
                          Validators.required,
                          Validators.pattern(this.unamePattern)]),
      cedula: new FormControl(null, [Validators.minLength(7),
                          Validators.maxLength(8),
                          Validators.required,
                          Validators.pattern(this.ucedulaPattern),
                          Validators.min(1000000)]),
      direccion: new FormControl(null, [Validators.required,
                          Validators.minLength(6),
                          Validators.maxLength(250)]),
      telefono:  new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required,
                          Validators.email], this.existeDB),
      type: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required,
                          Validators.minLength(6),
                          Validators.maxLength(20)]),
      password_confirmation: new FormControl(null, [Validators.required,
                          Validators.minLength(6),
                          Validators.maxLength(20)]),
    }, { validators: this.sonIguales()});
    // Se quita el autorrellenado de las casillas
    let entradas = window.document.getElementById('form-register').getElementsByTagName('input');
    for (const key in entradas) {
      if (entradas.hasOwnProperty(key)) {
        const entrada = entradas[key];
        entrada.setAttribute('autocomplete', 'off');
      }
    }
  }

  sonIguales () {
    return  (group: FormGroup) => {
      let pass1 = group.controls['password'].value;
      let pass2 = group.controls['password_confirmation'].value;

      if ( pass1 === pass2 ) {
        return null;
      }
      return {iguales: true};
    };
  }

  existeDB ( group: FormControl ): Promise<any> | Observable<any> {

    return this.emailTaken();
  }

  enviarFormulario() {
    this.user = this.forma.value;
    this._userService.registerUser( this.user )
      .subscribe( (respuesta: any ) => {
        console.log( respuesta );
      });

  }

  emailTaken(  ): any {
    let email = this.forma.controls['email'].value;
    // console.log( email, 'Correo enviado' );
    return this._validatorsService.emailTaken( email )
        .subscribe( (respuesta: any) => {
          let resp: Object = null;
          if ( respuesta ) {
            resp = { existe: true };
          }
          console.log(resp);
          return resp;
        });
  }
}
