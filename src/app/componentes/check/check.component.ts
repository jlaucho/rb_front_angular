import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  colorCkeck: string = 'cornsilk';
  check: boolean = false;

  @Input() idServicio: number;
  @Input() iteration: number;
  @Output() idSeleccionado: EventEmitter<object> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  agregarComponente() {
    this.check = this.check ? false : true;
    let seleccionado = {
      idServicio: this.idServicio,
      status: this.check
    }
    this.idSeleccionado.emit( seleccionado );
  }

}
