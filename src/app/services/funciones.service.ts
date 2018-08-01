import { Injectable } from '@angular/core';
@Injectable()
export class FuncionesGenericasService {
  constructor() {
    // console.log('servicios de funciones genericas listo');
  }

  limpiarCasillas( idForm: string ): void {
    let entradas = window.document.getElementById(idForm).getElementsByTagName('input');
    for (const key in entradas) {
      if (entradas.hasOwnProperty(key)) {
        const entrada = entradas[key];
        entrada.setAttribute('autocomplete', 'off');
      }
    }
  }
}
