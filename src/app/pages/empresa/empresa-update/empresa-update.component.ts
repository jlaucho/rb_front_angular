import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FuncionesGenericasService } from '../../../services/funciones.service';
import { EmpresaService } from '../../../services/empresa.service';
import { Empresa } from '../../../interfaces/empresa';
import { Observable } from 'rxjs';
import { ValidatorsService } from '../../../services/validators.service';
declare function init_plugis();

@Component({
  selector: 'app-empresa-update',
  templateUrl: './empresa-update.component.html',
  styles: []
})
export class EmpresaUpdateComponent implements OnInit {

  forma: FormGroup;
  caracterMax = 60;
  caracterMin = 3;
  empresa: Empresa;
  mensajeExito: Boolean = false;
  mensajeError: Boolean = false;

  constructor( private _funcionesService: FuncionesGenericasService,
               private _empresaService: EmpresaService,
               private _validadorService: ValidatorsService ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      name: new FormControl(null, [Validators.minLength( this.caracterMin ),
        Validators.maxLength( this.caracterMax ),
        Validators.required], this.existeName.bind( this )),
        RIF: new FormControl(null, [Validators.minLength( this.caracterMin ),
          Validators.maxLength( this.caracterMax ),
          Validators.required], this.existeRif.bind( this )),
      direccion: new FormControl(null, [Validators.minLength( this.caracterMin ),
        Validators.maxLength( 254 ),
        Validators.required]),
        telefono: new FormControl(null, [Validators.minLength( 10 ),
          Validators.maxLength( 15 ),
          Validators.required]),
          descripcion: new FormControl(null, [Validators.minLength( this.caracterMin ),
        Validators.maxLength( 254 ),
        Validators.required])
    });
    this._funcionesService.limpiarCasillas('form-register');
    init_plugis();
  }

  enviarFormulario() {
    let empresa: Empresa = this.forma.value;
    console.log( this.forma.controls );

    // this._empresaService.registerEmpresa( empresa )
    //     .subscribe( (resp: any) => {
    //       this.mensajeExito = resp.ok;
    //     });
  }

  // Limpiar el formulario
  limpiar(): void {
    this.forma.reset();
  }
  // fin de limpiar el formulario
  // Validaciones asincronas
  existeRif( rif: FormControl ): Observable<any> | Promise<any> {
    return new Promise(
      (resolve => {
        this._validadorService.existe( 'RIF', rif.value )
          .subscribe( (respuesta: any) => {
            console.log( respuesta );
            if (respuesta) {
              resolve ({ existe: true });
            } else {
              resolve (null);
            }
          });
      })
    );
  }

  existeName( name: FormControl ): Observable<any> | Promise<any> {
    return new Promise(
      (resolve => {
        this._validadorService.existe( 'name', name.value )
          .subscribe( (respuesta: any) => {
            console.log( respuesta );
            if (respuesta) {
              resolve ({ existe: true });
            } else {
              resolve (null);
            }
          });
      })
    );
  }

}
