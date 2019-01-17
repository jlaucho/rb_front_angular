import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../../services/empresa.service';
import { Empresa } from '../../../interfaces/empresa';
import Swal from 'sweetalert2';

declare function init_plugis();


@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['empresa.css']
})
export class EmpresaListComponent implements OnInit {

  empresa: Empresa[] = [];
  empresasDB: any = [];
  palabra: string;

  constructor( private _empresaService: EmpresaService ) { }

  ngOnInit() {
    this._empresaService.listarEmpresas()
        .subscribe( (resp: any) => {
          console.log( resp );
          this.empresasDB = resp;
          this.empresa = resp.empresas;
        });
  init_plugis();
  }

  busqueda(palabra: string) {
    palabra = palabra.toLowerCase();
    let temp: any = [];
    for (const empre of this.empresasDB.empresas) {
      if ( (empre.name.toLowerCase().indexOf(palabra) >= 0) ||
          (empre.direccion.toLowerCase().indexOf(palabra) >= 0) ||
          (empre.telefono.toLowerCase().indexOf(palabra) >= 0 ) ||
          (empre.RIF.toLowerCase().indexOf(palabra) > 0)   ||
          (empre.descripcion.toLowerCase().indexOf(palabra) > 0)  ) {
        temp.push(empre);
      }
    }
    this.empresa = temp;
}

eliminarEmpresa() {
  Swal('Importante', 'Verifique los datos he intente de nuevo!', 'warning');
      return;
}

}
