import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Empresa } from '../../../interfaces/empresa';

@Component({
  selector: 'app-factura-generar',
  templateUrl: './factura-generar.component.html',
  styleUrls: ['./factura-generar.component.css']
})
export class FacturaGenerarComponent implements OnInit {

  @Input() showModal: boolean;
  @Input() totalFactura: number;
  @Input() empresas: Empresa[];

  @Output() cerrar_modal: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  cerraModal() {
    this.cerrar_modal.emit(false);
  }
  buscar_empresa( idEmpresa: number ) {
    console.log( idEmpresa, "ID de la empresa" );
  }
}
