import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
        titulo: 'Dashboard',
        url: '/dashboard',
        },
        {
          titulo: 'Usuario',
          url: '/progress',
        }
      ]
    },
    {
      titulo: 'Usuario',
      icono: 'mdi mdi-bullseye',
      submenu: [
        {
          titulo: 'Listar',
          url: '/listarUsuarios',
        },
        {
          titulo: 'Subsmenus',
          url: '',
          submenu: [
            {
              titulo: 'menuInterno',
              url: '/interno1',
            },
            {
              titulo: 'Sub menu interno',
              url: '/interno2',
            }
          ]
        },
      ]
    }
  ];

  constructor() {
    console.log(this.menu[1].submenu[1].submenu[0].titulo);
   }

}
