import { User } from '../../../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit {

  usuariosDB: any;
  usuarios: any;

  constructor( private _userService: UserService ) { }

  ngOnInit() {
    this.listaUser();
  }

  listaUser(): void {
    this._userService.listaUser()
        .subscribe( (userList: any) => {
          this.usuariosDB = userList;
          console.log(this.usuariosDB);
          this.usuarios = this.usuariosDB.users;
        });
  }
  busqueda(palabra: string) {
      palabra = palabra.toLowerCase();
      let temp: any = [];
      for (const usuario of this.usuariosDB.users) {
        // console.log(usuario);
        if ( (usuario.name.toLowerCase().indexOf(palabra) >= 0) ||
            (usuario.apellido.toLowerCase().indexOf(palabra) >= 0) ||
            (usuario.email.toLowerCase().indexOf(palabra) >= 0)  ) {
          // this.usuarios = usuario;
          temp.push(usuario);
        }
      }
      // (temp.length === 0) ? this.usuarios = null : this.usuarios = temp;
      this.usuarios = temp;
      // console.log( this.usuarios );
  }
}
