import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Tabulador } from '../../../interfaces/tabulador';
import { TabuladorService } from '../../../services/tabulador.service';
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
  min: number = 10;
  max: number = 70;

  constructor(
    private _tabuladorService: TabuladorService
  ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      por_bono_nocturno: new FormControl(null, [Validators.required, Validators.min(this.min), Validators.max(this.max)]),
      por_encomienda: new FormControl( null, [Validators.required, Validators.min(this.min), Validators.max(this.max)] ),
      monto_pernocta: new FormControl(null, Validators.required),
      monto_horas: new FormControl(null, Validators.required),
      por_fin_semana: new FormControl(null, [Validators.required, Validators.min(this.min), Validators.max(this.max)]),
      monto_desv_inter: new FormControl(null, Validators.required),
      monto_desv_exter: new FormControl(null, Validators.required),
      fecha_inicio: new FormControl(null, Validators.required)
    });
    init_plugis();
  }

  enviarFormulario() {
    let tabulador: Tabulador = this.forma.value;
    this._tabuladorService.store( tabulador )
        .subscribe( (respuesta: any) => {
          console.log( respuesta );
        });
  }
  limpiar() {
    this.forma.reset();
  }

}
