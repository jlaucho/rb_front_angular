import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styles: []
})
export class UserRegisterComponent implements OnInit {

  forma: FormGroup;

  constructor() { }

  ngOnInit() {
    this.forma = new FormGroup({});
  }
  enviarFormulario() {
    console.log('Se envio el formulario');
  }
}
