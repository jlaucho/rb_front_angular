import { Component, OnInit, Input } from '@angular/core';
import { WidgateService } from '../../services/widgate.service';


@Component({
  selector: 'app-widgate',
  templateUrl: './widgate.component.html',
  styles: []
})
export class WidgateComponent implements OnInit {

  montoTotal: Number;
  cantidadOrdenes: Number;
  @Input() tipo: any = 'ordenes';
  @Input() clase: string;

  constructor( private _widgateService: WidgateService ) {
    console.log( this.tipo );
   }

  //  Las opciones de tipo son: ODC, Pago, Otros
  ngOnInit() {
    let data: any;
    switch (this.tipo) {
      case 'ODC':
        data = this._widgateService.pendientesODC();

        break;
      case 'Pago':
        data = this._widgateService.pendientesPago();

        break;
      case 'Otros':
        data = this._widgateService.pendientesOtros();

            break;
      default:
        break;
    }
    this.montoTotal = data.monto;
    this.cantidadOrdenes = data.cantidad;
  }

}
