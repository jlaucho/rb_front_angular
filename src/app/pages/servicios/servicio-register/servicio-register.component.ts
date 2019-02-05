import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ServiciosService } from '../../../services/servicios.service';
import { UserService } from '../../../services/user.service';
import { Servicio } from '../../../interfaces/servicio';
import { TabuladorService } from '../../../services/tabulador.service';
import { Tabulador } from '../../../interfaces/tabulador';
import { User } from '../../../interfaces/user';
// import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

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
  conductores: User[];
  mostrarMensaje: boolean = false;
  mensajeAlert: string = '';
  tipoAlert: string = 'success';
  detalleServicio: Servicio;
  mostrarDetalle: boolean = false;
  tabulador: Tabulador;
  montoDisabled: boolean = false;
  clickModal = true;
  Datepicker: string = '';
  clientes: User[];
  cliente: any;

  constructor(
    private _servicioService: ServiciosService,
    private _userService: UserService,
    private _tabuladorService: TabuladorService
  ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      mensaje: new FormControl(null, null),
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
    let datosFormulario = {
      // tslint:disable-next-line:max-line-length
      mensaje: `Buenos días`,
      fechaServicio: '2018-08-10',
      cantHoras: 0,
      cantPernocta: 0,
      cantCorreos: 1,
      bono_finSemana: 'NO',
      ODC: 'SI',
      realizado_por: 1,
      origen: [
        'maracaibo'
      ],
      destino: [
        'Cabimas'
      ],
      cantidad: [
        1
      ],
      concepto: [
        null
      ],
      encomienda: [
        'SI'
      ],
      nocturno: [
        'NO'
      ],
      recorrido: [
        80000000
      ]
    };

    // this.forma.setValue( datosFormulario );

    this.conductoresRegistrados();
    this.tabuladorActivo();
    this.getUsuariosClientes();

    init_plugis();
  }

  sacarModal () {
    let cliente = this.getUsuarioCliente( this.forma.value.mensaje );
    console.log(cliente);
    this.detalleServicio = this.forma.value;
    // tslint:disable-next-line:max-line-length
    this.detalleServicio.mensaje = `Por medio de la presente se detalla el servicio prestado a ${ cliente.name } ${ cliente.apellido }, sin mas a que hacer refecrecia.`;
    let monto_nocturno: number = 0;
    let monto_encomienda: number = 0;
    let monto_espera: number = 0;
    let monto_recorridos: number = 0;
    // tslint:disable-next-line:forin
    for (const key in this.detalleServicio.origen) {
      monto_recorridos += Number( this.detalleServicio.recorrido[key] );
     // tslint:disable-next-line:no-unused-expression
     if (this.detalleServicio.nocturno[key] === 'SI') {
        monto_nocturno += Number(this.detalleServicio.recorrido[key]);
     }
     if (this.detalleServicio.encomienda[key] === 'SI') {
      monto_encomienda += Number(this.detalleServicio.recorrido[key]);
     }
    }
    if (this.detalleServicio.cantHoras > 0) {
    monto_espera = Number(this.detalleServicio.cantHoras * this.tabulador.monto_horas);
    }
    //  Se asignan los valores de las sumas obtenidas
    this.detalleServicio.monto_nocturno = monto_nocturno;
    this.detalleServicio.monto_encomienda = monto_encomienda;
    this.detalleServicio.monto_espera = monto_espera;

    // tslint:disable-next-line:max-line-length
    this.detalleServicio.monto_general = (monto_nocturno * (this.tabulador.por_bono_nocturno / 100))
                                        + monto_espera + (monto_encomienda * (this.tabulador.por_encomienda / 100))
                                        + monto_recorridos;


    // console.log( this.forma.value );

    this.mostrarDetalle = true;
  }

  conductoresRegistrados () {
    this._userService.userConductores()
    .subscribe ( (resp: any) => {
      this.conductores = resp.conductores;
    });
  }

  verFormulario(): void {
    console.log(this.forma.controls);
  }

  enviarFormulario () {

    this._servicioService.registrarServicio ( this.forma.value )
        .subscribe( (resp: any) => {
          this.mensajeAlert = resp.mensaje;
          this.mostrarMensaje = resp.ok;
          this.tipoAlert = 'success';
          this.mostrarDetalle = false;
          this.quitar( true );
          this.limpiar();
          console.log( '=======================================', resp );
        },
<<<<<<< HEAD
          (error: any) => {
            this.mensajeAlert = 'Error al intentar enviar el correo electronico';
            this.mostrarMensaje = true;
            this.tipoAlert = 'danger';
            this.mostrarDetalle = false;
            this.quitar( true );
            this.limpiar();
            console.log(error.error.error);
=======
          (error) => {
            console.log(error);
>>>>>>> a1cdd2ed4c6da6c6ad0905afac1535b5d7a417d5
          }
        );
  }

  tabuladorActivo () {
    this._tabuladorService.obtenerLista('activo')
        .subscribe( (resp: any) => {
            this.tabulador = resp.busqueda[0];
            console.log( 'Tabulador', this.tabulador );
        });
  }

  limpiar() {
    // this.forma.reset();
    init_plugis();
  }
  agregarOtro() {
    // let valores = 1;
    let valores = this.forma.get('destino')['controls'].length;
    let datoActual = this.forma.controls['destino'].value[ ( valores - 1 ) ];
    (<FormArray>this.forma.controls['origen']).push(
      new FormControl(datoActual, Validators.required)
    );
    (<FormArray>this.forma.controls['destino']).push(
      new FormControl(null, Validators.required)
    );
    (<FormArray>this.forma.controls['cantidad']).push(
      new FormControl(null, Validators.required)
    );
    (<FormArray>this.forma.controls['concepto']).push(
      new FormControl(null, Validators.required)
    );
    (<FormArray>this.forma.controls['encomienda']).push(
      new FormControl(null, Validators.required)
    );
    (<FormArray>this.forma.controls['nocturno']).push(
      new FormControl(null, Validators.required)
    );
    (<FormArray>this.forma.controls['recorrido']).push(
      new FormControl(null, Validators.required)
    );

    // console.log('Le dio click');
    init_plugis();
  }


  quitar( todos: boolean = false ) {

    let valores = 0;

    if ( !todos ) {
      valores = this.forma.get('destino')['controls'].length - 1;
    }

    console.log( valores );
    (<FormArray>this.forma.controls['origen']).removeAt( valores );
    (<FormArray>this.forma.controls['destino']).removeAt( valores );
    (<FormArray>this.forma.controls['cantidad']).removeAt( valores );
    (<FormArray>this.forma.controls['concepto']).removeAt( valores );
    (<FormArray>this.forma.controls['encomienda']).removeAt( valores );
    (<FormArray>this.forma.controls['nocturno']).removeAt( valores );
    (<FormArray>this.forma.controls['recorrido']).removeAt( valores );


    console.log( this.forma.value );
  }

  cambioConcepto ( index: number, idrecorrido: string ) {
    console.log( 'index: ', index, 'idRecorrido: ', idrecorrido );
    let campoSeleccionado = window.document.getElementById(idrecorrido);
    //  Se captura el valodr al cambial el select de tipo de concepto
    let concepto = this.forma.controls['concepto'].value[index];

    if (concepto === 'DesvInter') {

      this.forma.controls['recorrido'].value[index] = this.tabulador.monto_desv_inter;
      campoSeleccionado.setAttribute('readonly', 'readonly');
    } else if (concepto === 'DesvExter') {

      this.forma.controls['recorrido'].value[index] = this.tabulador.monto_desv_exter;
      campoSeleccionado.setAttribute('readonly', 'readonly');

    } else {
      this.forma.controls['recorrido'].value[index] = null;
      // this.forma.controls['recorrido'].controls[index].disabled = false;
      campoSeleccionado.removeAttribute('readonly');
      // this.montoDisabled = false;
    }
    let valoresForm = this.forma.value;
    this.forma.setValue( valoresForm );
    campoSeleccionado.focus();
  }

  getUsuariosClientes() {
    this._userService.userCliente()
      .subscribe( (resp: any) => {
        this.clientes = resp.users;
        console.log(this.clientes);
      });
  }

  getUsuarioCliente( id: number ) {
    let respuesta = this.clientes.filter( (cliente: User) => {
      return (cliente.id === Number (id));
    });

    return respuesta[0];
  }

}
