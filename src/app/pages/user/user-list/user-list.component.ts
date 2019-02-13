import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { PaginationService } from '../../../services/pagination.service';
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
  busquedaPalabra: string = '';
  parametro: string;
  total: number;
  numeroPaginas: any = [];
  prev_page_url: any = null;
  next_page_url: any = null;

  constructor( private _userService: UserService,
               private activeRouter: ActivatedRoute,
               private router: Router ) {

          router.events.subscribe( (event: any) => {
            if (event instanceof NavigationEnd) {
                this.obtenerParametro();
                this.listaUser('', '');
            }
        });
    }

  ngOnInit() {

    init_plugis();
  }

  obtenerParametro () {

    this.activeRouter.params.subscribe( (parametro: any): void => {
      this.parametro = parametro.tipo;
    });
  }

  listaUser( page: string = '', palabra: string ): void {
    this._userService.listaUser( this.parametro, page, palabra )
    .subscribe( (userList: any) => {
      this.total = userList.users.total;
      this.usuariosDB = userList;
      this.usuarios = userList.users.data;
      this.prev_page_url = (this.usuariosDB.users.prev_page_url) ? true : false;
      this.next_page_url = (this.usuariosDB.users.next_page_url) ? true : false;
      this.numeroPagina();
    }, (error: any)=>{
      console.log(error);
    });
  }


  // Esta funcion busca todas la coincidencia dentro de la misma pagina "Sin paginacion"
  busqueda(palabra: string) {
    if ( palabra.length > 2 ) {
      this.listaUser( '', palabra );
    } else if ( palabra.length === 2 ) {
      this.listaUser( '', '' );
    }
}

  // Esta funcion busca todas la coincidencia dentro de la misma pagina "Sin paginacion"
  busqueda2(palabra: string) {
      palabra = palabra.toLowerCase();
      let temp: any = [];
      for (const usuario of this.usuariosDB.users.data) {
        let encontro: boolean = false;
        for (let i in usuario) {
          if (usuario.hasOwnProperty(i)) {
            if (usuario[i]) {

              let element = usuario[i].toString().toLowerCase();
              if ( element.indexOf( palabra ) >= 0) {
                // console.log( element );
                encontro = true;
              }
            }
        }
        }
        if (encontro) {
          temp.push(usuario);
        }
      }
      this.usuarios = temp;
      console.log( this.usuarios );
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
          console.log( respuesta, 'id: ', id );
          this.respuestasLista( true, id );
          Swal('Borrar', 'Usuario borrado satisfactoriamente!', 'success');
        });
      }
    });
  }

  reactivarUser( id: number ): void {
    Swal({
      title: 'Estas Seguro?',
      text: 'Desea reactivar el usuario!',
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, Reactivar!!!'
    }).then((result) => {
      if (result.value) {
        this._userService.reactivarUser( id )
        .subscribe( (respuesta: any) => {
          this.respuestasLista( false, id );
          console.log( respuesta, 'id: ', id );
          Swal('Reactivar', 'Usuario Reactivado satisfactoriamente!', 'success');
        });
      }
    });
  }

  respuestasLista ( isActived: boolean, id: number ): void {

    console.log( 'usuariosDB: ', this.usuariosDB );
    for (const usuario in this.usuariosDB.users.data) {
      if ( this.usuariosDB.users.data[usuario].id === id) {
        if ( this.parametro === 'todos' ) {
        this.usuariosDB.users.data[usuario].deleted_at = isActived;
      } else {
        this.usuariosDB.users.data.splice( usuario, 1 );
        this.usuariosDB.total = this.usuariosDB.total - 1;
      }
    }
  }

  // if ( this.busquedaPalabra ) {
  //   this.busqueda( this.busquedaPalabra );
  //    if (this.usuarios.length === 0 ) {
  //       this.busquedaPalabra = '';
  //       this.busqueda('');
  //       window.document.getElementById('palabra').focus();
  //    }
  // }

}
    nexPage( url: string ) {
      if (url) {
        let index = url.indexOf( '?' );
        url = url.slice( index );
        this.listaUser( url, this.busquedaPalabra );
      }
    }

  numeroPagina() {
    this.numeroPaginas = [];
    let totalPaginas = this.usuariosDB.users.last_page;
    // console.log( 'ultima pagina', this.usuariosDB.users.last_page );
    for (let index = 1; index < (totalPaginas + 1); index++) {
      this.numeroPaginas.push( index );
    }
    // console.log( this.numeroPaginas );
  }

  irA( index: number ): void {
    let page = `?page=${ index }`;
    this.listaUser( page, this.busquedaPalabra );
  }
}
