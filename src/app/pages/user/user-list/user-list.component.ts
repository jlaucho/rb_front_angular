import { User } from '../../../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { filter } from 'rxjs/operators';
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
      console.log( this.usuarios );
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

  borrarUser( id: number ): void {



    Swal({
      title: 'Estas Seguro?',
      text: 'Si borras el usuario no puedes revertir la ejecusion!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, Borrar!!!'
    }).then((result) => {
      if (result.value) {
        this._userService.borrarUser( id )
        .subscribe( (respuesta: any) => {
          let temp = this.usuariosDB.users.filter( ( usuario ) => {
            return usuario.id !== respuesta.user.id;
          });
          console.log( 'temporales', temp );
          // this.usuarios = temp;
          this.usuarios = this.usuariosDB.users = temp;
          this.usuariosDB.total = this.usuariosDB.total - 1;

          let palabraInput = window.document.getElementById('palabra');
          if ( palabraInput.value.length > 0 ) {
            this.busqueda( palabraInput.value );
             if (this.usuarios.length === 0 ) {
                palabraInput.value = '';
                this.busqueda('');
                palabraInput.focus();
                // palabraInput.blur();
             }
          }


        });
        Swal('Borrar', 'Usuario borrado satisfactoriamente!', 'success');
      }
    });
  }
}
