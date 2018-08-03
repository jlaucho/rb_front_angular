import { User } from '../../../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
declare function init_plugis();


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['../../empresa/empresa-list/empresa.css']
})
export class UserListComponent implements OnInit {

  usuariosDB: any = [];
  usuarios: any = [];

  constructor( private _userService: UserService ) { }

  ngOnInit() {
    this.listaUser();
    init_plugis();
  }

  listaUser(): void {
    this._userService.listaUser()
    .subscribe( (userList: any) => {
      this.usuariosDB = userList;
      this.usuarios = userList.users;
      console.log( userList );
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
      this.usuarios = temp;
  }
}
