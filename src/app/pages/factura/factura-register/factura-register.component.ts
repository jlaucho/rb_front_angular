import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../../services/servicios.service';
import { Servicio } from '../../../interfaces/servicio';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmpresaService } from '../../../services/empresa.service';
import { FacturaService } from '../../../services/factura.service';


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
  seleccionadas: any[] = new Array();
  totalFactura: number;
  empresas: Empresa[] = new Array();
  empresaID: Number;

  constructor(
    private _ServiciosService: ServiciosService,
    private _EmpresasService: EmpresaService,
    private _FacturaService: FacturaService
  ) { }

  ngOnInit() {
    this.getServicios();
    this.forma = new FormGroup({
      firstName: new FormControl(null)
    });
    this.empresasRegistradas();
  }

  show_modal() {
    console.log('cliak');
    console.log(this.empresas.length);
    this.showModal = true;
  }

  close_modal(event) {
    this.showModal = false;
  }
  getServicios() {
    this._ServiciosService.listaServicio ( 'por_facturar' )
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
    for (let index = 1; index < (totalPaginas + 1); index++) {
      this.numeroPaginas.push( index );
    }
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
  }

  seleccionServicio( event ) {
    if ( event.status ) {
      let seleccion = this.servicios.filter(function(servicio) {
        if (event.idServicio === servicio.idCorreos) {
          return servicio;
        }
      });
      this.seleccionadas.push(seleccion[0]);
    } else {
      for (let key in this.seleccionadas) {
        if (this.seleccionadas.hasOwnProperty(key)) {
          let element = this.seleccionadas[key];
          if (element.idCorreos === event.idServicio) {
            this.seleccionadas.splice(Number(key), 1);
          }
        }
      }
    }
    this.totalFactura = 0;
    for (let key in this.seleccionadas) {
      if (this.seleccionadas.hasOwnProperty(key)) {
        let element = this.seleccionadas[key];
        this.totalFactura += element.totalMonto;
      }
    }
  }
  empresasRegistradas() {
    this._EmpresasService.listarEmpresas()
      .subscribe((resp: any) =>{
        this.empresas = resp.empresas;
        console.log(this.empresas);
      }, (err: any) =>{
        console.log('error al intentar buscar las empresas', err);
      });
  }

  generarFactura(event){
    console.log('evento', event);
    if (!event) {
      return;
    }
    console.log('estamos en generar factura, las seleccionadas son: ', this.seleccionadas);
    console.log('---------------------------------------------------', this.empresaID);
    this._FacturaService.generarFactura(this.seleccionadas)
      .subscribe( (resp: any) =>{
        console.log("desde el Backend", resp);
      }, (err: any) =>{
        console.error("error desde el Backend", err);
      });

  }
}

interface Empresa {
  RIF: String;
  created_at: String;
  deleted_at: String;
  descripcion: String;
  direccion: String;
  idEmpresas: Number;
  name: String;
  telefono: String;
  update_at: String;
}
