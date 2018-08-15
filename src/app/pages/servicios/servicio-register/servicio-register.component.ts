import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
declare function init_plugis();

@Component({
  selector: 'app-servicio-register',
  templateUrl: './servicio-register.component.html',
  styleUrls: ['servicio-register.css']
})
export class ServicioRegisterComponent implements OnInit {

  forma: FormGroup;
  caracterMin: number = 20;
  caracterMax: number = 250;

  constructor() { }

  ngOnInit() {

    this.forma = new FormGroup({
      mensaje: new FormControl(null),
      fechaServicio: new FormControl(null),
      cantHoras: new FormControl(null),
      cantPernocta: new FormControl(null),
      cantCorreos: new FormControl(null),
      bono_finSemana: new FormControl(null),
      ODC: new FormControl(null),
      realizado_por: new FormControl(null),
      registrado_por: new FormControl(null),
      origen: new FormArray([
        new FormControl(null),
      ]),
      destino: new FormArray([

        new FormControl(null),
      ]),
      cantidad: new FormArray([

        new FormControl(null),
      ]),
      concepto: new FormArray([

        new FormControl(null),
      ]),
      encomienda: new FormArray([

        new FormControl(null),
      ]),
      nocturno: new FormArray([

        new FormControl(null),
      ]),
      recorrido: new FormArray([

        new FormControl(null),
      ])
    });

    init_plugis();
  }

  enviarFormulario () {
    console.log( this.forma.value );
  }

  limpiar() {
    this.forma.reset();
  }
  agregarOtro() {
    (<FormArray>this.forma.controls['origen']).push(
      new FormControl(null)
    );
    (<FormArray>this.forma.controls['destino']).push(
      new FormControl(null)
    );
    (<FormArray>this.forma.controls['cantidad']).push(
      new FormControl(null)
    );
    (<FormArray>this.forma.controls['concepto']).push(
      new FormControl(null)
    );
    (<FormArray>this.forma.controls['encomienda']).push(
      new FormControl(null)
    );
    (<FormArray>this.forma.controls['nocturno']).push(
      new FormControl(null)
    );
    (<FormArray>this.forma.controls['recorrido']).push(
      new FormControl(null)
    );

    console.log('Le dio click');
    init_plugis();
  }

  quitar() {
    console.log('quitar');
  }

}
