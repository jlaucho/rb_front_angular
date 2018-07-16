import { Component, OnInit } from '@angular/core';
import { GraficaService } from '../../services/grafica.service';

@Component({
  selector: 'app-grafico-linea',
  templateUrl: './grafico-linea.component.html',
  styles: []
})
export class GraficoLineaComponent implements OnInit {

  titulo: string;

  anio = new Date().getFullYear();

  public ChartData: any[];
  public ChartLabels: string[];
  public ChartType: string;
  public ChartLegend: string;
  public ChartColors: any[];
  public ChartOptions: any[];

  constructor( private _graficaService: GraficaService ) { }

  ngOnInit() {
    this._graficaService.dataGraficas();
    // console.log( this._graficaService.data );
    this.ChartColors = this._graficaService.ChartColors;
    this.titulo = this._graficaService.data.titulo;
    this.ChartData = this._graficaService.data.datos;
    this.ChartLabels = this._graficaService.data.labels;
    this.ChartType = this._graficaService.data.type;
    this.ChartLegend = this._graficaService.data.legend;
    this.ChartOptions = this._graficaService.data.options;
  }

  actualizarMes () {
    this._graficaService.actualizarMes(1);
    this.titulo = this._graficaService.data.titulo;
    this.ChartData = this._graficaService.data.datos;
    this.ChartLabels = this._graficaService.data.labels;
    this.ChartType = this._graficaService.data.type;
    this.ChartLegend = this._graficaService.data.legend;
    this.ChartOptions = this._graficaService.data.options;
  }
}
