import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../user.service';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivateChild {
  constructor(
    private _userService: UserService,
    private router: Router
  ){
    
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> | boolean {
      console.log('desde VerifyTokenGuards');

      let token = this._userService.token;
      console.log(token);
      let payload = JSON.parse(atob(token.split('.')[1] ));
      let expirado = this.fecha_expiracion( payload.exp );

      if(expirado) {
        this.router.navigate(['/login']);
        return false;
      }
      let paso = this.verficaToken();
      console.log(paso);
      return paso;
  }
  verficaToken(): Promise<boolean> {
    return new Promise((resolve, reject)=>{
        this._userService.me()
          .subscribe( ()=>{
            resolve(true);
          }, ()=>{
            reject(false);
            this.router.navigate(['/login']);
          });
    });
  }

  fecha_expiracion( exp: number ) {
    let ahora = new Date().getTime() / 1000;
    if ( exp < ahora ) {
      return true;
    }

    return false;
  }
}
