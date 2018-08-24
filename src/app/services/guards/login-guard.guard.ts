import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor ( private _userService: UserService,
                private router: Router ) {}

  canActivate() {
    if (this._userService.isLogued()) {
        return true;
    } else {
      this.router.navigate(['/login']);
        return false;
    }
  }
}
