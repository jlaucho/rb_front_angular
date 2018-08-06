import { User } from '../../../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
// import { filter } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

declare function init_plugis();


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['../../empresa/empresa-list/empresa.css']
})
export class UserListComponent implements OnInit {

  usuariosDB: any = [];
  usuarios: any = [];
  busquedaPalabra: string;
  parametro: string;

  constructor( private _userService: UserService,
               private activeRouter: ActivatedRoute, 
               private router: Router ) { 
    
          router.events.subscribe( (event: Event) => {
            if (event instanceof NavigationEnd) {
                this.obtenerParametro();
                this.listaUser();
            }
        });
                 
    }
                
  ngOnInit() {
    
    init_plugis();
  }
  
  obtenerParametro () {
    
    this.activeRouter.params.subscribe( (parametro: string) =>{
      this.parametro = parametro.tipo;
    });
    // console.log('parametro', this.parametro);
  }

  listaUser(): void {
    this._userService.listaUser( this.parametro )
    .subscribe( (userList: any) => {
      // console.log( userList );
      this.usuariosDB = userList;
      this.usuarios = userList.users;
      // console.log( this.usuarios );
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
          console.log( 'palabra de busqueda', this.busquedaPalabra );
          // this.usuarios = temp;
          this.usuarios = this.usuariosDB.users = temp;
          this.usuariosDB.total = this.usuariosDB.total - 1;

          if ( this.busquedaPalabra ) {
            this.busqueda( this.busquedaPalabra );
             if (this.usuarios.length === 0 ) {
                this.busquedaPalabra = '';
                this.busqueda('');
                window.document.getElementById('palabra').focus();
                // palabraInput.blur();
             }
          }


        });
        Swal('Borrar', 'Usuario borrado satisfactoriamente!', 'success');
      }
    });
  }
}
