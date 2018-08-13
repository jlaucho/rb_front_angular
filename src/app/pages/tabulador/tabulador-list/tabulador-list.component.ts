import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tabulador } from '../../../interfaces/tabulador';
import { TabuladorService } from '../../../services/tabulador.service';


@Component({
  selector: 'app-tabulador-list',
  templateUrl: './tabulador-list.component.html',
  styleUrls: ['./tabulador-list.component.css']
})
export class TabuladorListComponent implements OnInit {

  parametro: string;
  tabuladores: Tabulador[];

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
          console.log( respuesta );
        });
  }

}
