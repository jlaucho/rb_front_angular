import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { ValidatorsService } from '../../../services/validators.service';
import { FuncionesGenericasService } from '../../../services/funciones.service';
import { ShowErrorsFormService } from '../../../services/show-errors-form.service';
import Swal from 'sweetalert2';

declare function init_plugis();


import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styles: ['button {margin-left: 15px;}']
})
export class UserRegisterComponent implements OnInit {

  forma: FormGroup;
  caracterMax = 25;
  caracterMin = 4;
  user: User;
  unamePattern = '^[a-zA-Z ]+$';
  ucedulaPattern = '^[0-9]+$';
  email: string;
  respuesta: any;
  erroresBack: any;



   constructor( public _userService: UserService,
               public _validatorsService: ValidatorsService,
               private router: Router,
              private _funcionesService: FuncionesGenericasService,
              private _showErrorsForm: ShowErrorsFormService) { }

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
                          Validators.min(2000000)]),
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
    // let entradas = window.document.getElementById('form-register').getElementsByTagName('input');
    // for (const key inerror.error.error entradas) {
    //   if (entradas.haerror.error.errorsOwnProperty(key)) {
    //     const entradaerror.error.error = entradas[key];
    //     entrada.setAterror.error.errortribute('autocomplete', 'off');
    //   }
    // }
    this._funcionesService.limpiarCasillas('form-register');
    init_plugis();
    // this.rellenarCasillas();
  }

  // tslint:disable-next-line:member-ordering
  carga = {
    'name': 'Jesus',
    'apellido': 'Laucho',
    'cedula': '14136448',
    'direccion': 'San Rafael',
    'telefono': '0416-5608003',
    'email': 'jlaucho@gmail.com',
    'type': 'supeAdmin',
    'password': '14460484',
    'password_confirmation': '14460484'
};

  rellenarCasillas() {
    this.forma.setValue( this.carga );
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
      (resolve)  => {
          this._validatorsService.emailTaken( group.value )
              .subscribe((respuesta) => {
            if (respuesta) {
              resolve({'existe': true});
            } else {
              resolve(null);
            }
          },
          (error: any) => {
            this.router.navigate(['/login']);
            console.log(error.message);
          });
      });
    return promesa;
  }
  // Fin de la validacion de correo existente

  // Envo de formulario
  enviarFormulario() {
    console.log('enviando formulario');
    if( this._showErrorsForm.showErrorsForm( this.forma ) ) {
      return;
    }
    console.log('paso la primera validacion');
    this.user = this.forma.value;
    this._userService.registerUser( this.user )
      .subscribe( (respuesta: any ) => {
        this.respuesta = respuesta;
        console.log( respuesta );
        this.limpiar();
        init_plugis();
        this.erroresBack = false;
        if (respuesta.ok) {
         Swal(
          'Completado',
          `Se completo el registro del usurio ${ respuesta.user.name } ${respuesta.user.apellido} correctamente`,
           'success'
           );
        }
      },
        (error: any) => {
          this._showErrorsForm.showErrorsBackEnd(error.error.error);
        }
      );

  }

}
