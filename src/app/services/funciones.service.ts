import { Injectable } from '@angular/core';
@Injectable()
export class FuncionesGenericasService {
  constructor() {
    // console.log('servicios de funciones genericas listo');
  }

  limpiarCasillas( idForm: string ): void {
    let entradas = window.document.getElementById(idForm).getElementsByTagName('input');
    let entradasSelect = window.document.getElementById(idForm).getElementsByTagName('select');

    for (let key in entradasSelect) {
      if (entradasSelect.hasOwnProperty(key)) {
        let element = entradasSelect[key];
        element.focus();
        // element.blur();
      }
    }
    for (let key in entradas) {
      if (entradas.hasOwnProperty(key)) {
        let entrada = entradas[key];
        entrada.setAttribute('autocomplete', 'off');
        entrada.focus();
        entrada.blur();
      }
    }
  }
}
