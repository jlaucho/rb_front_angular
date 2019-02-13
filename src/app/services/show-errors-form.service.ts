import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ShowErrorsFormService {

  constructor() { }


  showErrorsForm(forma: FormGroup): boolean {
    let show: boolean = false;
    let controls = forma.controls;
    let htmlErrors: string = '';
    htmlErrors += `<div class="alert alert-danger text-left"><ul>`;
    for (const key in controls) {
      if (controls.hasOwnProperty(key)) {
        const element = controls[key].errors;
        if (element) {
          show = true;
           htmlErrors += `<li>`;
          if ( element.required ) {
            htmlErrors += `El campo ${ key } es requerido`;
          }
          if ( element.minlength ) {
            htmlErrors += `El campo ${ key } necesita mas caracteres`;
          }
          if ( element.maxlength ) {
            htmlErrors += `El campo ${ key } tiene demaciados caracteres`;
          }
          if ( element.pattern ) {
            htmlErrors += `El campo ${ key } no tiene el patron necesarios`;
          }
          if ( element.email ) {
            htmlErrors += `El campo ${ key } no tiene un formato de email valido`;
          }
          if ( element.min ) {
            htmlErrors += `El campo ${ key } debe ser de un numero menor`;
          }
          if ( element.max ) {
            htmlErrors += `El campo ${ key } debe ser de un numero mayor`;
          }
          if ( element.existe ) {
            htmlErrors += `El valor ${ controls[key].value } ya se encuentra registrado`;
          }
          htmlErrors += `</li>`;
        }
      }
    }
    htmlErrors +=`</ul></div>`;
    if ( show ) {
      this.sweetAlert(htmlErrors);
      }
    return show;
  }

  showErrorsBackEnd(errors): void {
    let htmlErrors: string = '';
    htmlErrors += `<div class="alert alert-danger text-left"><ul>`;
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        const element = errors[key];
        htmlErrors += `<li>${ element }</li>`;
      }
    }
    htmlErrors +=`</ul></div>`;
    this.sweetAlert(htmlErrors);
    }

  private sweetAlert(html: string): void {
    Swal(
      'Upsss error !!!',
      `${ html }`,
      'error'
      );
  }
}
