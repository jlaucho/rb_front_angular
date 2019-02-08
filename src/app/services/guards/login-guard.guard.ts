import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor ( private _userService: UserService,
                private router: Router ) {}

  canActivate() {
    if (this._userService.isLogued() && this._userService.tokenValid) {
        console.log(this._userService.tokenValid);
        return true;
    } else {
      console.log(this._userService.tokenValid);
      this.router.navigate(['/login']);
        return false;
    }
  }
}
