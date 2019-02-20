import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiciosService } from '../../../services/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-odc',
  templateUrl: './asignar-odc.component.html',
  styleUrls: ['./asignar-odc.component.css']
})
export class AsignarODCComponent implements OnInit {

  @Input() mostrarODC: boolean;
  @Input() detalleServicio: any;
  @Input() parametro: String;
  @Output() cerrarModal: EventEmitter<boolean> = new EventEmitter();
  @Output() actualizarLista: EventEmitter<boolean> = new EventEmitter();

  forma: FormGroup;

  constructor( private _ServicioService: ServiciosService) { }

  ngOnInit() {
    this.forma = new FormGroup({
      ODC_number: new FormControl(null, Validators.required)
    });
  }

  cerrar() {
    this.mostrarODC = false;
    this.cerrarModal.emit( this.mostrarODC );
  }

  enviarODC(idCorreos) {
    this.forma.value.idServicio = idCorreos;
    let body: EnviarODC = this.forma.value;
    console.log( this.forma );

    this._ServicioService.agregarODC( body )
      .subscribe( (resp: any) => {
            console.log(resp);
            this.mostrarODC = false;
            this.cerrarModal.emit( this.mostrarODC );
            this.actualizarLista.emit(true);
            
            if (resp.ok) {
              Swal(
                'Asignaci&oacute;n de ODC',
                `La asignacion del ODC bajo el numero ${ body.ODC_number } se realizo correctamente`,
                'success'
                );
              }
      }, (err: any) => {
        console.log(err, 'Error al intentar asignar numero de ODC');
        Swal(
            'Error de signaci&oacute;n de ODC',
            `La asignacion del ODC bajo el numero ${ body.ODC_number } no fue posible realizarla,
             si el problema persiste coloquese en contacto con el administrador del sistema`,
            'error'
        );
      }, () => {
        console.log('siempre se ejecuta esta linea');
      });
  }
}


interface EnviarODC {
  idCorreo: Number,
  ODC_number: string
}

