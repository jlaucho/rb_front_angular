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
        url: '/user-register',
        },
        {
          titulo: 'Buscar',
          url: '',
          submenu: [
            {
              titulo: 'Todos',
              url: '/user-list/todos',
            },
            {
              titulo: 'Activos',
              url: '/user-list/activos',
            },
            {
              titulo: 'Inactivos',
              url: '/user-list/inactivos',
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
          url: '/empresa-register',
        },
        {
          titulo: 'Buscar',
          url: '',
          submenu: [
            {
              titulo: 'Todas',
              url: '/empresa-list',
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
          url: '/servicio-register',
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
    },
    {
      titulo: 'Tabulador',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Registrar',
          url: '/tabulador-register',
        },
        {
          titulo: 'Buscar',
          url: '/',
          submenu: [
            {
              titulo: 'Todos',
              url: '/tabulador-list/todos'
            },
            {
              titulo: 'Activo',
              url: '/tabulador-list/activo'
            },
            {
              titulo: 'Inactivos',
              url: '/tabulador-list/inactivos'
            },
          ]
        }
      ]
    }
  ];

  constructor() {
    // console.log(this.menu[1].submenu[1].submenu[0].titulo);
   }

}
