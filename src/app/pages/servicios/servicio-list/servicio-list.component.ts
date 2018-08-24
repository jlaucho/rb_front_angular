import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from '../../../services/servicios.service';

@Component({
  selector: 'app-servicio-list',
  templateUrl: './servicio-list.component.html',
  styleUrls: ['../../empresa/empresa-list/empresa.css']
})
export class ServicioListComponent implements OnInit {

  total: number;
  serviciosDB: any = [];
  servicios: any = [];
  prev_page_url: boolean = null;
  next_page_url: boolean = null;
  busquedaPalabra: string;
  numeroPaginas: any = [];

  constructor( private activatedRoute: ActivatedRoute,
               private _ServicioService: ServiciosService ) { }

  ngOnInit() {
    this.obtenerParametro();
  }
  obtenerParametro () {
    this.activatedRoute.params.subscribe( (param: any) => {
      this.obtenerLista( param.parametro );
    });
  }
  obtenerLista ( parametro: string  ) {
    this._ServicioService.listaServicio ( parametro )
        .subscribe( ( resp: any ) => {
          console.log( resp );
          this.total = resp.correos.total;
          this.serviciosDB = resp;
          this.servicios = resp.correos.data;
          // console.log( this.serviciosDB );
          this.prev_page_url = (this.serviciosDB.correos.prev_page_url) ? true : false;
          this.next_page_url = (this.serviciosDB.correos.next_page_url) ? true : false;
          this.numeroPagina();
        });
  }

  busqueda (parametro: string) {
    console.log( parametro );
  }

  borrarServicio( id: number ) {
     console.log('Le dico click a borrar servicio');
   }

  reactivarServicio( id: number ) {
    console.log('Le dico click a borrar servicio');
  }

  nexPage ( url: string ) {
    console.log( url );
  }
  numeroPagina() {
    this.numeroPaginas = [];
    let totalPaginas = this.serviciosDB.correos.last_page;
    // console.log( 'ultima pagina', this.usuariosDB.users.last_page );
    for (let index = 1; index < (totalPaginas + 1); index++) {
      this.numeroPaginas.push( index );
    }
    // console.log( this.numeroPaginas );
  }
}
