import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  forma: FormGroup;
  hora = new Date();


  constructor( private _userService: UserService ) {

    this.forma = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.email]),
      password: new FormControl( null, [Validators.required, Validators.minLength(5)] ),
      recuerdame: new FormControl(null)
    });

    if (localStorage.getItem('email')) {
        this.forma.value.email = localStorage.getItem('email');
        console.log('existe email guardado');
    }
  }

  ngOnInit() {
  }
  enviarLogin() {
    if (this.forma.value.recuerdame) {
    }
    this._userService.loginUser( this.forma.value ).subscribe( (data: any) => {
      this._userService.storageUser( data );
    });
  }

}
