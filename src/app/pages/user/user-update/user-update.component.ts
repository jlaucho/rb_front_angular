import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { ValidatorsService } from '../../../services/validators.service';
import { FuncionesGenericasService } from '../../../services/funciones.service';
declare function init_plugis();

import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styles: []
})
export class UserUpdateComponent implements OnInit {

  forma: FormGroup;
  caracterMax = 25;
  caracterMin = 4;
  user: any;
  unamePattern = '^[a-zA-Z ]+$';
  ucedulaPattern = '^[0-9]+$';
  email: string;
  idUser: number;

   constructor( public _userService: UserService,
               public _validatorsService: ValidatorsService,
              private _funcionesService: FuncionesGenericasService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.buscarUser();
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
      type: new FormControl(null, [Validators.required])
    });
    init_plugis();
    }
  // fin de eliminacion de autorellenado

  buscarUser() {
    let id = this.route.params.subscribe( (resp: any) => {
      this.idUser = resp.idUser;
      this._userService.buscarUser( resp.idUser )
          .subscribe( (respuesta: any) => {
            this.user = {
              name: respuesta.user.name,
              apellido: respuesta.user.apellido,
              cedula: respuesta.user.cedula,
              direccion: respuesta.user.direccion,
              email: respuesta.user.email,
              telefono: respuesta.user.telefono,
              type: respuesta.user.type
            };
              this.forma.setValue( this.user );
              this._funcionesService.limpiarCasillas('form-register');
            });
      });
  }

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
              if (respuesta.email === this.user.email) {
                resolve (null);
              } else {
                resolve({'existe': true});
              }
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
    let user = this.forma.value;
    console.log( this.forma.value );
    this._userService.actualizarUser( this.idUser, user )
        .subscribe( (resp: any) => {
          console.log( resp );
        });

  }

}

