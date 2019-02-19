import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from '../../../services/servicios.service';
import { Servicio } from '../../../interfaces/servicio';
import { Tabulador } from '../../../interfaces/tabulador';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';

declare function init_plugis();

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
  Ok: boolean = true;
  mensaje: string = '';
  mostrarDetalle: boolean = false;
  detalleServicio: Servicio;
  tabulador: Tabulador;
  mostrarODC: boolean = false;
  forma: FormGroup;

  constructor( private activatedRoute: ActivatedRoute,
               private _ServicioService: ServiciosService ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      ODC_number: new FormControl(null, Validators.required)
    });

    this.obtenerParametro();
    init_plugis();
  }
  obtenerParametro () {
    this.activatedRoute.params.subscribe( (param: any) => {
      // console.log( param.parametro );
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
      this.prev_page_url = (this.serviciosDB.correos.prev_page_url) ? true : false;
      this.next_page_url = (this.serviciosDB.correos.next_page_url) ? true : false;
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

  busqueda (parametro: string) {
    console.log( parametro );
  }

  borrarServicio( id: number ) {
     this._ServicioService.deleteServicio( id )
       .subscribe( (resp: any) =>{
         let servicio: Servicio = resp.servicio;
        Swal(
          'Eliminaci&oacute;n',
          `La eliminacion del servicio realizado el dia ${ servicio.fechaServicio } se realizo correctamente`,
           'success'
           );
       }, (err: any) =>{
        Swal(
          'error',
          `Error al tratar de eliminar el servicio`,
           'success'
           );
       });
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

  datosServicio ( idServicio: number, modalID: string) {
    this._ServicioService.showServicio( idServicio )
    .subscribe( (resp: any) => {
      this.detalleServicio = resp.busqueda[0];
      console.log(this.detalleServicio);
      if (modalID === 'mostrarDetalle') {
        this.mostrarDetalle = true;
      }
      if (modalID === 'mostrarODC') {
        this.mostrarODC = true;
      }
    }, (err: any) => {
      console.log(err);
    });
  }

  irA( pagina: any ): void {
    console.log( pagina );
  }

  enviarODC(idCorreos) {
    this.forma.value.push(idCorreos);
    console.log(this.forma);
    this._ServicioService.agregarODC( idCorreos )
      .subscribe(  );
  }

}
