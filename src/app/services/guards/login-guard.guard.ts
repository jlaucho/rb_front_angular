import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {
   value: boolean;
  constructor ( private _userService: UserService,
                private router: Router ) {
                  this._userService.me()
                    .subscribe((resp: any)=>{
                      this.value = resp.ok;
                    }, (error: any)=>{
                      this.router.navigate(['/login']);
                      this.value = error.ok;

                    });
                }
  
  canActivate() {
    if (this.value) {
        console.log(this.value);
        return true;
    } else {
      console.log(this.value);
      this.router.navigate(['/login']);
        return false;
    }
  }
}
