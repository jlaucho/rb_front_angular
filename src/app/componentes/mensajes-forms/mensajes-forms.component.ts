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

  nombre: string = '';

  constructor() {

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
   }
  }

}
