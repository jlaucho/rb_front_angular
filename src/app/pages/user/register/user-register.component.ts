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
  unamePattern = '^[a-z0-9_-]{6,15}$';

  constructor( private _userService: UserService,
               private _validatorsService: ValidatorsService ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      name: new FormControl(null, [Validators.minLength(2),
                          Validators.maxLength(40),
                          Validators.required,
                          Validators.pattern(this.unamePattern)]),
      apellido: new FormControl('laucho', [Validators.minLength(2), Validators.maxLength(40), Validators.required]),
      cedula: new FormControl('14136448', [Validators.minLength(2), Validators.maxLength(40), Validators.required]),
      direccion: new FormControl('San rafael'),
      telefono:  new FormControl('04165608003', [Validators.required]),
      email: new FormControl(null, Validators.required, this.emailTaken.bind(this)),
      type: new FormControl('superAdmin'),
      password: new FormControl('14460484'),
      password_confirmation: new FormControl('14460484'),
    });
    let entradas = window.document.getElementById('form-register').getElementsByTagName('input');
    for (const key in entradas) {
      if (entradas.hasOwnProperty(key)) {
        const entrada = entradas[key];
        entrada.setAttribute('autocomplete', 'off');
      }
    }
  }
  enviarFormulario() {
    this.user = this.forma.value;
    console.log( this.forma.controls['name'] );
    // this._userService.registerUser( this.user )
    //   .subscribe( (respuesta: any ) => {
    //     console.log( respuesta );
    //   });

  }

  emailTaken(  ) {
    let email = 'jlaucho@gmail.com';
    // console.log( email, 'Correo enviado' );
    this._validatorsService.emailTaken( email )
        .subscribe( (respuesta: any) => {
          return true;
        });
  }
}
