import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FuncionesGenericasService } from '../../../services/funciones.service';
import { EmpresaService } from '../../../services/empresa.service';
import { Empresa } from '../../../interfaces/empresa';
import { Observable } from 'rxjs';
import { ValidatorsService } from '../../../services/validators.service';
import Swal from 'sweetalert2';
import { ShowErrorsFormService } from '../../../services/show-errors-form.service';
import { Router } from '@angular/router';
declare function init_plugis();

@Component({
  selector: 'app-empresa-register',
  templateUrl: './empresa-register.component.html',
  styles: ['.margin-left-10{margin-left: 10px;}']
})
export class EmpresaRegisterComponent implements OnInit {

  forma: FormGroup;
  caracterMax = 60;
  caracterMin = 3;

  constructor( private _funcionesService: FuncionesGenericasService,
               private _empresaService: EmpresaService,
               private _validadorService: ValidatorsService,
               private _showErrorsForm: ShowErrorsFormService,
               private router: Router ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      name: new FormControl(null, [Validators.minLength( this.caracterMin ),
        Validators.maxLength( this.caracterMax ),
        Validators.required], this.existeName.bind( this )),
      RIF: new FormControl(null, [Validators.minLength( this.caracterMin ),
          Validators.maxLength( this.caracterMax ),
          Validators.required]),
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
    // this.rellenarCasillas();
  }

  enviarFormulario() {
    if ( this._showErrorsForm.showErrorsForm( this.forma ) ) {
      return;
    }
    let empresa: Empresa = this.forma.value;
    this._empresaService.registerEmpresa( empresa )
        .subscribe( (resp: any) => {
          Swal(
            'Completado',
            `el registro de la empresa ${ resp.empresa.name } fue exitoso`,
            'success'
            );
            this.router.navigate(['/empresa-list']);
        }, (error: any) => {
          // console.log(error.error.error);
          this._showErrorsForm.showErrorsBackEnd(error.error.error);
        });
  }

  limpiar(): void {
    this.forma.reset();
    init_plugis();
  }
  // fin de limpiar el formulario
  // Validaciones asincronas
  // existeRif( rif: FormControl ): Observable<any> | Promise<any> {
  //   return new Promise(
  //     (resolve => {
  //       this._validadorService.existe( 'RIF', rif.value )
  //         .subscribe( (respuesta: any) => {
  //           console.log( respuesta );
  //           if (respuesta) {
  //             resolve ({ existe: true });
  //           } else {
  //             resolve (null);
  //           }
  //         });
  //     })
  //   );
  // }

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
