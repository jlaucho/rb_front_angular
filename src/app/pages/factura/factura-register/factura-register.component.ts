import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../../services/servicios.service';
import { HttpClient } from '@angular/common/http';
import { Servicio } from '../../../interfaces/servicio';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-factura-register',
  templateUrl: './factura-register.component.html',
  styleUrls: ['../../empresa/empresa-list/empresa.css']
})
export class FacturaRegisterComponent implements OnInit {

  showModal: boolean;
  serviciosDB: any;
  total: any;
  servicios: Servicio[];
  totalFacturado: number;
  prev_page_url: boolean;
  next_page_url: boolean;
  Ok: boolean;
  mensaje: any;
  numeroPaginas: any[];
  busquedaPalabra: string;
  forma: FormGroup;
  colorCheck: string = 'cornsilk';
  seleccionadas: any[];

  constructor(
    private _ServiciosService: ServiciosService,
  ) { }

  ngOnInit() {
    this.getServicios();
    this.forma = new FormGroup({
      firstName: new FormControl(null)
    });
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
      this.totalFacturado = resp.total;
      this.servicios = resp.correos.data;
      this.serviciosDB = resp;
      this.prev_page_url = (resp.correos.prev_page_url) ? true : false;
      this.next_page_url = (resp.correos.next_page_url) ? true : false;
      this.numeroPagina();
      this.Ok = true;
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

  busqueda (parametro: string) {
    console.log( parametro );
  }
  nexPage ( url: string ) {
    console.log( url );
  }

  enviarFormulario() {
    console.log(this.forma.value);
  }

  agregar( id: number, element ) {
    this.colorCheck = '#000';
    console.log(id, element);
  }

  seleccionServicio( event ) {
    console.log(this.servicios);
    if( event.status ) {
      let seleccion = this.servicios.filter(function(servicio){
        if(event.idServicio === servicio.idCorreos){
          return servicio;
        }
      });
      console.log(seleccion[0]);
      this.seleccionadas.push(seleccion[0]);
    } else {
      for (const key in this.seleccionadas) {
        if (this.seleccionadas.hasOwnProperty(key)) {
          const element = this.seleccionadas[key];
          if(element.idServicio === event.idServicio){
            this.seleccionadas.splice(key, 1);
          }
        }
      }
    }
    console.log(this.seleccionadas);
  }
}
