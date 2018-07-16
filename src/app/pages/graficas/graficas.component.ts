import { Component, OnInit } from '@angular/core';
import { GraficaService } from '../../services/grafica.service';


@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styles: []
})
export class GraficasComponent implements OnInit {

  titulo: string;

  anio = new Date().getFullYear();

  public doughnutChartLabels: string[];
  public doughnutChartData: number[];
  public doughnutChartType: string;

  constructor( private _graficaService: GraficaService ) { }

  ngOnInit() {
    this.titulo = this._graficaService.dataGraficas().grafico1.titulo;
    this.doughnutChartData = this._graficaService.dataGraficas().grafico1.data;
    this.doughnutChartLabels = this._graficaService.dataGraficas().grafico1.labels;
    this.doughnutChartType = this._graficaService.dataGraficas().grafico1.type;
  }

  actualizarMes () {
    console.log( this._graficaService.data );
    this.titulo = this._graficaService.data.grafico1.titulo;
    this.doughnutChartData = this._graficaService.data.grafico1.data;
    this.doughnutChartLabels = this._graficaService.data.grafico1.labels;
    this.doughnutChartType = this._graficaService.data.grafico1.type;
  }
}
