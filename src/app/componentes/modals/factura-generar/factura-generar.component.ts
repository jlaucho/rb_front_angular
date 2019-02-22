import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-factura-generar',
  templateUrl: './factura-generar.component.html',
  styleUrls: ['./factura-generar.component.css']
})
export class FacturaGenerarComponent implements OnInit {

  @Input() showModal: boolean;
  @Output() cerrar_modal: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  cerraModal() {
    this.cerrar_modal.emit(false);
  }
}
