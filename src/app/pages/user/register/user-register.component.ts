import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styles: []
})
export class UserRegisterComponent implements OnInit {

  forma: FormGroup;
  user: User;

  constructor( private _userService: UserService ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      name: new FormControl('Jesus', [Validators.minLength(2), Validators.maxLength(40), Validators.required]),
      apellido: new FormControl('laucho'),
      cedula: new FormControl('14136448'),
      direccion: new FormControl('San rafael'),
      telefono:  new FormControl('04165608003', [Validators.required]),
      email: new FormControl('jlaucho@gmail.com'),
      type: new FormControl('superAdmin'),
      password: new FormControl('14460484'),
      password_confirmation: new FormControl('14460484'),
    });
  }
  enviarFormulario() {
    this.user = this.forma.value;
    console.log( this.forma.value );

    this._userService.registerUser( this.user )
      .subscribe( (respuesta: any ) => {
        console.log( respuesta );
      });

  }
}
