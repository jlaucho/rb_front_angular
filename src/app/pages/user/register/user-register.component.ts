import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { ValidatorsService } from '../../../services/validators.service';
import { Observable } from 'rxjs/Observable';

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
  debouncer: any;



   constructor( public _userService: UserService,
               public _validatorsService: ValidatorsService) { }

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
                          Validators.email], this.existeDB.bind( this )),
      type: new FormControl(null, [Validators.required]),
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

  // Limpiar el formulario
  limpiar(): void {
    this.forma.reset();
  }
  // fin de limpiar el formulario

  // Validacion de password iguales
  sonIguales (): any {
    return  (group: FormGroup) => {
      let pass1 = group.controls['password'].value;
      let pass2 = group.controls['password_confirmation'].value;

      if ( pass1 === pass2 ) {
        return null;
      }
      return {iguales: true};
    };
  }
  // Fin de la validacion de password iguales

  // Validacion de correo existente en la BD
  existeDB ( group: FormControl): Promise<any> | Observable<any> {
    let promesa = new Promise(
      ( resolve ) => {
          this._validatorsService.emailTaken( group.value )
              .subscribe((respuesta) => {
            if (respuesta) {
              resolve({'existe': true});
            } else {
              resolve(null);
            }
          });
      });
    return promesa;
  }
  // Fin de la validacion de correo existente

  // Envo de formulario
  enviarFormulario() {
    this.user = this.forma.value;
    console.log( this.forma );
    this._userService.registerUser( this.user )
      .subscribe( (respuesta: any ) => {
        console.log( respuesta );
      });

  }

}
