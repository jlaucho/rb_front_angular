import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Usuario',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
        titulo: 'Registrar',
        url: '/userregister',
        },
        {
          titulo: 'Buscar',
          url: '',
          submenu: [
            {
              titulo: 'Todos',
              url: '/interno1',
            },
            {
              titulo: 'Cedula',
              url: '/interno2',
            },
            {
              titulo: 'Activos',
              url: '/interno2',
            },
            {
              titulo: 'Inactivos',
              url: '/interno2',
            }
          ]
        }
      ]
    },
    {
      titulo: 'Empresa',
      icono: 'mdi mdi-bullseye',
      submenu: [
        {
          titulo: 'Registrar',
          url: '/registercompany',
        },
        {
          titulo: 'Buscar',
          url: '',
          submenu: [
            {
              titulo: 'Todas',
              url: '/interno1',
            },
            {
              titulo: 'Por RIF',
              url: '/interno2',
            },
            {
              titulo: 'Por Nombre',
              url: '/interno2',
            }
          ]
        },
      ]
    },
    {
      titulo: 'Servicios',
      icono: 'mdi mdi-bullseye',
      submenu: [
        {
          titulo: 'Registrar',
          url: '/listarUsuarios',
        },
        {
          titulo: 'Buscar',
          url: '',
          submenu: [
            {
              titulo: 'Todos',
              url: '/interno1',
            },
            {
              titulo: 'Por ODC',
              url: '/interno2',
            },
            {
              titulo: 'Por Facturar',
              url: '/interno2',
            },
            {
              titulo: 'Facturados',
              url: '/interno2',
            }
          ]
        },
      ]
    },
    {
      titulo: 'Factura',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Registrar',
          url: '/',
        },
        {
          titulo: 'Buscar',
          url: '/',
          submenu: [
            {
              titulo: 'Todas',
              url: '/'
            },
            {
              titulo: 'Pendientes',
              url: '/',
            },
            {
              titulo: 'Numero de Factura',
              url: '/'
            },
            {
              titulo: 'Rango de Fecha',
              url: '/'
            }
          ]
        }
      ]
    }
  ];

  constructor() {
    console.log(this.menu[1].submenu[1].submenu[0].titulo);
   }

}
