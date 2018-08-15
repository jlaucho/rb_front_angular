import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tabulador } from '../../../interfaces/tabulador';
import { TabuladorService } from '../../../services/tabulador.service';


@Component({
  selector: 'app-tabulador-list',
  templateUrl: './tabulador-list.component.html',
  styleUrls: ['../../empresa/empresa-list/empresa.css']
})
export class TabuladorListComponent implements OnInit {

  parametro: string;
  tabuladores: any = [];
  busquedaPalabra: string;
  total: number;

  constructor(
    private _tabuladorService: TabuladorService,
    private activeRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.obtenerParametro();
  }

  obtenerParametro () {

    this.activeRouter.params.subscribe( (parametro: any): void => {
      this.parametro = parametro.tipo;
      this.obtenerLista( this.parametro );
    });
  }

  obtenerLista ( parametro: string ): void {
    this._tabuladorService.obtenerLista( parametro )
        .subscribe( (respuesta: any) => {
          this.tabuladores = respuesta.busqueda;
          this.total = respuesta.total;
          console.log( this.tabuladores );
        });
  }

  busqueda( palabra: string ) {
    console.log(palabra);
  }

}
