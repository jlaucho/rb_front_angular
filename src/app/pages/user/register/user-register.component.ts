import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { ValidatorsService } from '../../../services/validators.service';
import 'rxjs/add/operator/map';

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

 

   constructor( private _userService: UserService,
               private _validatorsService: ValidatorsService ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      name: new FormControl(null, [Validators.minLength( this.caracterMin ),
                          Validators.maxLength( this.caracterMax ),
                          Validators.required,
                          Validators.pattern(this.unamePattern)]),
      apellido: new FormControl('laucho', [Validators.minLength(this.caracterMin),
                          Validators.maxLength(this.caracterMax),
                          Validators.required,
                          Validators.pattern(this.unamePattern)]),
      cedula: new FormControl('14136448', [Validators.minLength(7),
                          Validators.maxLength(8),
                          Validators.required,
                          Validators.pattern(this.ucedulaPattern),
                          Validators.min(1000000)]),
      direccion: new FormControl(null, [Validators.required,
                          Validators.minLength(6),
                          Validators.maxLength(250)]),
      telefono:  new FormControl('04165608003', [Validators.required]),
      email: new FormControl(null, [Validators.required,
                          Validators.email]),
      type: new FormControl('superAdmin', [Validators.required]),
      password: new FormControl(null, [Validators.required,
                          Validators.minLength(6),
                          Validators.maxLength(20)]),
      password_confirmation: new FormControl(null, [Validators.required,
                          Validators.minLength(6),
                          Validators.maxLength(20)]),
    }, { validators: this.sonIguales()});
    // Se quita el autorellenado de las casillas
    let entradas = window.document.getElementById('form-register').getElementsByTagName('input');
    for (const key in entradas) {
      if (entradas.hasOwnProperty(key)) {
        const entrada = entradas[key];
        entrada.setAttribute('autocomplete', 'off');
      }
    }
  }
  // fin de eliminacion de autorellenado

// Validacion de password iguales
  sonIguales () {
    return  (group: FormGroup) => {
      let pass1 = group.controls['password'].value;
      let pass2 = group.controls['password_confirmation'].value;

      if ( pass1 === pass2 ) {
        return null;
      }
      return {Iguales: true};
    };
  }
// fin de la validacion de password iguales
// se envia la data al servicio para que la grabe en la BD
  enviarFormulario() {
    this.user = this.forma.value;
    // console.log( this.forma.errors );
    this._userService.registerUser( this.user )
      .subscribe( (respuesta: any ) => {
        console.log( respuesta );
      });

  }
// Validacion de verificacion si el email ya se encuentra registrado
  emailTaken(  ) {
    let email = 'jlaucho@gmail.com';
    // console.log( email, 'Correo enviado' );
    return this._validatorsService.emailTaken( email )
        .subscribe( (respuesta: any) => {
          if (respuesta) {
            return { existe: true };
          }
          return null;
        });
  }
  // fin de la validacion del email
}
