import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FuncionesGenericasService } from '../../../services/funciones.service';
import { EmpresaService } from '../../../services/empresa.service';
import { Empresa } from '../../../interfaces/empresa';




@Component({
  selector: 'app-empresa-register',
  templateUrl: './empresa-register.component.html',
  styles: []
})
export class EmpresaRegisterComponent implements OnInit {

  forma: FormGroup;
  caracterMax = 60;
  caracterMin = 3;
  empresa: Empresa;
  mensajeExito: Boolean = false;
  mensajeError: Boolean = false;

  constructor( private _funcionesService: FuncionesGenericasService,
               private _empresaService: EmpresaService ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      name: new FormControl(null, [Validators.minLength( this.caracterMin ),
            Validators.maxLength( this.caracterMax ),
            Validators.required]),
      RIF: new FormControl(null, [Validators.minLength( this.caracterMin ),
            Validators.maxLength( this.caracterMax ),
            Validators.required]),
      direccion: new FormControl(null, [Validators.minLength( this.caracterMin ),
            Validators.maxLength( 254 ),
            Validators.required]),
      telefono: new FormControl(null, [Validators.minLength( this.caracterMin ),
            Validators.maxLength( 15 ),
            Validators.required]),
      descripcion: new FormControl(null, [Validators.minLength( this.caracterMin ),
        Validators.maxLength( 254 ),
        Validators.required])
    });

    this._funcionesService.limpiarCasillas('form-register');
  }

  enviarFormulario() {
    let empresa: Empresa = this.forma.value;
    this._empresaService.registerEmpresa( empresa )
        .subscribe( (resp: any) => {
          this.mensajeExito = resp.ok;
        });
  }

  // Limpiar el formulario
  limpiar(): void {
    this.forma.reset();
  }
  // fin de limpiar el formulario

}
