import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-mensajes-forms',
  templateUrl: './mensajes-forms.component.html',
  styles: []
})
export class MensajesFormsComponent implements OnInit {

  @Input() forma: FormGroup;
  @Input() selectorName: string;
  @Input() caracterMin: number;
  @Input() caracterMax: number;
  @Input() min: number;
  @Input() max: number;

  nombre: string = '';

  constructor() {
      console.log('desde el composnente de verga de eta')
  }

  ngOnInit() {
    this.nombre = this.selectorName;
   switch (this.nombre) {
    case 'name':
       this.nombre = 'nombre';
       break;
    case 'type':
       this.nombre = 'tipo';
       break;
    case 'password':
       this.nombre = 'clave';
       break;
    case 'por_bono_nocturno':
       this.nombre = 'bono nocturno';
       break;
   }
  }


}
