import { Injectable } from '@angular/core';

@Injectable()
export class WidgateService {

  // data: any;

  constructor() {}

  pendientesODC(): any {
    let data = {
      monto: 1244511.78,
      cantidad: 12
    };
    return data;
  }
  pendientesPago(): any {
    let data = {
      monto: 12511.78,
      cantidad: 5
    };
    return data;
  }
  pendientesOtros(): any {
    let data = {
      monto: 0,
      cantidad: 0
    };
    return data;
  }

}
