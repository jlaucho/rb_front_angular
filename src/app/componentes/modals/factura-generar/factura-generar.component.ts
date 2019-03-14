import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Empresa } from '../../../interfaces/empresa';
import { BusquedaColeccionService } from '../../../services/busqueda-coleccion.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';



@Component({
  selector: 'app-factura-generar',
  templateUrl: './factura-generar.component.html',
  styleUrls: ['./factura-generar.component.css']
})
export class FacturaGenerarComponent implements OnInit {

  @Input() showModal: boolean;
  @Input() totalFactura: number;
  @Input() empresas: Empresa[];

  empresa_seleccionada: Empresa;
  montoIVA: number = 0;
  totalGeneral: number = 0;
  IVA_por: number;
  fechaFactura: String;
  forma: FormGroup;


  @Output() cerrar_modal: EventEmitter<boolean> = new EventEmitter();
  @Output() event_generar: EventEmitter<any> = new EventEmitter();
  @Output() empresa_id: EventEmitter<any> = new EventEmitter();

  constructor( private _busquedaService: BusquedaColeccionService) { }

  ngOnInit() {
    this.forma = new FormGroup({
      IVA_por: new FormControl(null),
      numFactura: new FormControl(null),
      fechaFactura: new FormControl(null)
    });
  }

  cerraModal() {
    this.cerrar_modal.emit(false);
    this.event_generar.emit(false);
  }
  buscar_empresa( idEmpresa: number ) {
    this._busquedaService.buscarRegistro('empresa', idEmpresa)
      .subscribe( (resp: any) => {
        this.empresa_seleccionada = resp.busqueda[0];
      }, (err: any) => {
        console.log('error', err);
      });
  }

  calcularTotalGeneral(iva: number) {
    this.IVA_por = iva;
    this.montoIVA = this.totalFactura * (iva / 100);
    this.totalGeneral = this.totalFactura + this.montoIVA;
  }

  generarFactura(){
    let datos = this.forma.value;
    datos.empresas_id = this.empresa_seleccionada.idEmpresas;
    
    this.cerrar_modal.emit(false);
    this.event_generar.emit(datos);

  }
}

interface Generar {
  numFactura: Number;
  fechaFactura: String;
  IVA_por: Number;
  descripcionFactura?: String;
  empresa_id: Number;
  correo_id: any;
  cantServicios: any;
  codigo: any;
}
