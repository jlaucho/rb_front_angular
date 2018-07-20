import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styles: []
})
export class UserRegisterComponent implements OnInit {

  forma: FormGroup;
  user: User;

  constructor() { }

  ngOnInit() {
    this.forma = new FormGroup({
      select2: new FormControl(null),
      type: new FormControl(null),
      name: new FormControl(null),
      apellido: new FormControl(null),
      cedula: new FormControl(null),
      direccion: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
      password_confirm: new FormControl(null),
    });
  }
  enviarFormulario() {
    console.log(this.forma.value);
    this.user = this.forma.value;
  }
}
