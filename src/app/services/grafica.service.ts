import { Injectable } from '@angular/core';

@Injectable()
export class GraficaService {

  public data: any;

  constructor() {
    console.log('Servicio de graficas listo');
   }

   dataGraficas() {
     let data = {
       grafico1: {
        labels: ['primera', 'segunda', 'tercera', 'cuartaa', 'quinta', 'sexta'],
        data: [34, 21, 34, 2, 56, 78],
        type: 'line',
        leyenda: 'Este es un grafico de prueba',
        titulo: 'Este es el titulo'
       },
     };
     return data;
   }

   actualizarMes( mes: Number ) {
     console.log('MES', mes);
    let data = {
      grafico1: {
       labels: ['primera', 'segunda', 'tercera', 'cuartaa', 'quinta', 'sexta'],
       data: [89, 14, 67, 13, 44, 67],
       type: 'line',
       leyenda: 'Este es un grafico de prueba',
       titulo: 'Este es el titulo'
      },
    };
    this.data = data;
   }

}
