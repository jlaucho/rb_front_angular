import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Empresa } from '../../../interfaces/empresa';
import { BusquedaColeccionService } from '../../../services/busqueda-coleccion.service';


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

  @Output() cerrar_modal: EventEmitter<boolean> = new EventEmitter();
  @Output() event_generar: EventEmitter<any> = new EventEmitter();

  constructor( private _busquedaService: BusquedaColeccionService) { }

  ngOnInit() {
  }

  cerraModal() {
    this.cerrar_modal.emit(false);
    this.event_generar.emit(false);
  }
  buscar_empresa( idEmpresa: number ) {
    this._busquedaService.buscarRegistro('empresa', idEmpresa)
      .subscribe( (resp: any) => {
        this.empresa_seleccionada = resp.busqueda[0];
        console.log(this.empresa_seleccionada);
      }, (err: any) => {
        console.log('error', err);
      });
  }

  calcularTotalGeneral(iva: number) {
    this.montoIVA = this.totalFactura * (iva / 100);
    this.totalGeneral = this.totalFactura + this.montoIVA;
  }

  generarFactura(){
    console.log('Le dio clik en generar factura');
    this.cerrar_modal.emit(false);
    this.event_generar.emit(true);

  }
}
