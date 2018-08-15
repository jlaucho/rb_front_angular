import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ServiciosService } from '../../../services/servicios.service';
import { UserService } from '../../../services/user.service';
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
  usuarios: any;
  mostrarMensaje: boolean = false;
  mensajeAlert: string = '';
  tipoAlert: string = 'success';

  constructor(
    private _servicioService: ServiciosService,
    private _userService: UserService
  ) { }

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

    this.usuariosRegistrados();

    init_plugis();
  }

  enviarFormulario () {
    this._servicioService.registrarServicio ( this.forma.value )
        .subscribe( (resp: any) => {
          this.mensajeAlert = resp.mensaje;
          this.mostrarMensaje = resp.ok;
          this.tipoAlert = 'success';
          console.log( '=======================================', resp );
        });
  }

  usuariosRegistrados () {
    // let url = `${ environment.basePath }api/v1/user/todos`;
    this._userService.userRegister()
        .subscribe ( (resp: any) => {
          this.usuarios = resp.users;
          console.log('========================================', this.usuarios);
        });
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
