import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  forma: FormGroup;
  recuerdame: Recuerdame = {
    user: null,
    activo: false
  };


  constructor( private _userService: UserService, private router: RouterLink ) {

    this.forma = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.email]),
      password: new FormControl( null, [Validators.required, Validators.minLength(5)] ),
      recuerdame: new FormControl(null)
    });

    if (localStorage.getItem('recuerdame')) {
        this.recuerdame = {
          user: localStorage.getItem('recuerdame'),
          activo: true
        };
        console.log(this.recuerdame);
    }
  }

  ngOnInit() {
  }
  enviarLogin() {
    console.log(this.forma.value);
    if (this.forma.value.recuerdame) {
      localStorage.setItem('recuerdame', this.forma.value.email);
    } else {
      localStorage.removeItem('recuerdame');
    }
    this._userService.loginUser( this.forma.value ).subscribe( (data: any) => {
      this._userService.storageUser( data );
    });
  }

}

export interface Recuerdame {
  user: String;
  activo: Boolean;
}
