import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detalle-servicio',
  templateUrl: './detalle-servicio.component.html',
  styleUrls: ['./detalle-servicio.component.css']
})
export class DetalleServicioComponent implements OnInit {

  @Input() mostrarDetalle: boolean;
  @Input() detalleServicio: any;

  @Output('cerrarModal') cerrar: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.mostrarDetalle);
  }

  ocultarModal() {
    this.mostrarDetalle = false;
    this.cerrar.emit( this.mostrarDetalle );
  }

}
