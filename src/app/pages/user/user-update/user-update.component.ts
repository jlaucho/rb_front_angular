import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { ValidatorsService } from '../../../services/validators.service';
import { FuncionesGenericasService } from '../../../services/funciones.service';
declare function init_plugis();

import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styles: ['button { margin-left: 15px }']
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
              private route: ActivatedRoute,
              private router: Router) { }

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
      this.route.params.subscribe( (resp: any) => {
      this.idUser = resp.idUser;
      this._userService.buscarUser( resp.idUser )
          .subscribe( (respuesta: any) => {
            this.user = {
              name: respuesta.busqueda[0].name,
              apellido: respuesta.busqueda[0].apellido,
              cedula: respuesta.busqueda[0].cedula,
              direccion: respuesta.busqueda[0].direccion,
              email: respuesta.busqueda[0].email,
              telefono: respuesta.busqueda[0].telefono,
              type: respuesta.busqueda[0].type
            };
              init_plugis();
              this.forma.setValue( this.user );
              // this._funcionesService.limpiarCasillas('form-register');
            });
      });
  }

  // Limpiar el formulario
  limpiar(): void {
    this.forma.reset();
  }
  // fin de limpiar el formulario

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
          this.router.navigate(['user-list', 'activos']);
          console.log( resp );
        });

  }

}

