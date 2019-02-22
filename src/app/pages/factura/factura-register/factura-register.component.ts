import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../../services/servicios.service';
import { HttpClient } from '@angular/common/http';
import { Servicio } from 'src/app/interfaces/servicio';

@Component({
  selector: 'app-factura-register',
  templateUrl: './factura-register.component.html',
  styleUrls: ['./factura-register.component.css']
})
export class FacturaRegisterComponent implements OnInit {

  showModal: boolean;
  $servicios: any;
  total: any;
  servicios: Servicio[];
  serviciosDB: any;
  prev_page_url: boolean;
  next_page_url: boolean;
  Ok: boolean;
  mensaje: any;
  numeroPaginas: any[];

  constructor(
    private _ServiciosService: ServiciosService,
  ) { }

  ngOnInit() {
    this.getServicios();
  }

  show_modal() {
    console.log('cliak');
    this.showModal = true;
    console.log(this.showModal);
  }

  close_modal(event) {
    this.showModal = false;
    console.log(this.showModal);
  }
  getServicios() {
    this._ServiciosService.listaServicio ( "por_facturar" )
    .subscribe( ( resp: any ) => {
      this.total = resp.correos.total;
      this.serviciosDB = resp;
      this.servicios = resp.correos.data;
      this.prev_page_url = (this.serviciosDB.correos.prev_page_url) ? true : false;
      this.next_page_url = (this.serviciosDB.correos.next_page_url) ? true : false;
      this.numeroPagina();
      this.Ok = true;
      console.log( this.servicios );
      },
      (error: any) => {
        this.Ok = false;
        console.log( error.error.mensaje );
        this.total = 0;
        this.serviciosDB = [];
        this.servicios = [];
        this.mensaje = error.error.mensaje;

        this.prev_page_url = false;
        this.next_page_url = false;
        // this.numeroPagina();
      }
    );
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
