import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

declare function init_plugis();


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


  constructor( private _userService: UserService,
               private router: Router) {

    this.forma = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.email]),
      password: new FormControl( null, [Validators.required, Validators.minLength(5)] ),
      recuerdame: new FormControl(null)
    });

    if (localStorage.getItem('recuerdame')) {
      let login = {
        email: localStorage.getItem('recuerdame'),
        password: '',
        recuerdame: true
      };
        this.forma.setValue(login);
        // this.recuerdame = {
        //   user: localStorage.getItem('recuerdame'),
        //   activo: true
        // };
        console.log(this.recuerdame);
    }
  }

  ngOnInit() {
    init_plugis();
  }
  enviarLogin() {
    if (this.forma.value.recuerdame) {
      localStorage.setItem('recuerdame', this.forma.value.email);
    } else {
      localStorage.removeItem('recuerdame');
    }
    this._userService.loginUser( this.forma.value )
      .subscribe( (data: any) => {
        this._userService.storageUser( data );
        this.router.navigate(['/dashboard']);
    });
  }

}

interface Recuerdame {
  user: String;
  activo: Boolean;
}
