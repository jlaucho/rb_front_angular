import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Servicio } from 'src/app/interfaces/servicio';
import { Tabulador } from 'src/app/interfaces/tabulador';
import { BusquedaColeccionService } from '../../../services/busqueda-coleccion.service';

@Component({
  selector: 'app-servicio-update',
  templateUrl: './servicio-update.component.html',
  styleUrls: ['./servicio-update.component.css']
})
export class ServicioUpdateComponent implements OnInit {

  private idServicio: Number;
  forma: FormGroup;
  caracterMin: number = 20;
  caracterMax: number = 250;
  usuarios: any;
  mostrarMensaje: boolean = false;
  mensajeAlert: string = '';
  tipoAlert: string = 'success';
  detalleServicio: Servicio;
  mostrarDetalle: boolean = false;
  tabulador: Tabulador;
  montoDisabled: boolean = false;
  clickModal = true;
  Datepicker: string = '';

  constructor(
    private route: ActivatedRoute,
    private _busqueda: BusquedaColeccionService
  ) {
    this.capturarID();
   }

  ngOnInit() {
    this.forma = new FormGroup({
      mensaje: new FormControl(null, Validators.required),
      fechaServicio: new FormControl(null, Validators.required),
      cantHoras: new FormControl(null, Validators.required),
      cantPernocta: new FormControl(null, Validators.required),
      cantCorreos: new FormControl(null, Validators.required),
      bono_finSemana: new FormControl(null, Validators.required),
      ODC: new FormControl(null, Validators.required),
      realizado_por: new FormControl(null, Validators.required),
      origen: new FormArray([
        new FormControl(null, Validators.required),
      ]),
      destino: new FormArray([

        new FormControl(null, Validators.required),
      ]),
      cantidad: new FormArray([

        new FormControl(null, Validators.required),
      ]),
      concepto: new FormArray([

        new FormControl(null, Validators.required),
      ]),
      encomienda: new FormArray([

        new FormControl(null, Validators.required),
      ]),
      nocturno: new FormArray([

        new FormControl(null, Validators.required),
      ]),
      recorrido: new FormArray([

        new FormControl(null, Validators.required),
      ])
    });
  }

  capturarID() {
    this.route.params.subscribe( (resp: any) => {
      this.buscarServicio( resp.idServicio );
    });
  }

  buscarServicio(idServicio: Number) {
    this._busqueda.buscarRegistro('servicio', idServicio)
      .subscribe( (resp: any) => {
        console.log(resp);
      });
  }

  enviarFormulario() {
    console.log(this.forma.value);
  }
}
