import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
declare function init_plugis();


@Component({
  selector: 'app-tabulador',
  templateUrl: './tabulador.component.html',
  styles: []
})
export class TabuladorComponent implements OnInit {

  forma: FormGroup;
  caracterMin: number = 1;
  caracterMax: number = 3;

  constructor() { }

  ngOnInit() {
    this.forma = new FormGroup({
      por_bono_nocturno: new FormControl(null, Validators.required)
    });
    init_plugis();
  }

  enviarFormulario() {
  }
  limpiar() {
    this.forma.reset();
  }

}
