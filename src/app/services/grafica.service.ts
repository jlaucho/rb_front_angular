import { Injectable } from '@angular/core';

@Injectable()
export class GraficaService {

  public data: any;

  constructor() {
    console.log('Servicio de graficas listo');
  }
  public ChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  dataGraficas() {
    let data = {
       labels: ['primera', 'segunda', 'tercera', 'cuartaa', 'quinta', 'sextda', 'Septima'],
       datos: [
         {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
         {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
         {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
        ],
       type: 'line',
       legend: 'Este es un grafico de prueba',
       titulo: 'Este es el titulo',
       ChartLegend: true,
       options: { rsponsive: true }
    };
    this.data = data;
    // console.log(this.data);
   }

   actualizarMes( mes: Number ) {
     let data = {
         labels: ['primera', 'segunda', 'tercera', 'cuartaa', 'quinta', 'sexta', 'siete'],
         datos: [
           {data: [78, 59, 80, 81, 56, 55, 40], label: 'Series A'},
           {data: [28, 12, 40, 19, 86, 27, 12], label: 'Series B'},
           {data: [18, 48, 77, 9, 43, 27, 40], label: 'Series C'}
          ],
          type: 'line',
          legend: 'Este es el cambio de grafico iterativo de linea',
          titulo: 'Titulo de grafico de linea',
          ChartLegend: true,
          options: { rsponsive: true }
      };
      this.data = data;
      console.log(this.data.datos);
   }

}
