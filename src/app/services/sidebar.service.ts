import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Usuario',
      icono: 'mdi mdi-account-outline',
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
      icono: 'mdi mdi-city',
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
            }
          ]
        },
      ]
    },
    {
      titulo: 'Servicios',
      icono: 'mdi mdi-car',
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
              url: '/servicio-list/todos',
            },
            {
              titulo: 'Por ODC',
              url: '/servicio-list/ODC',
            },
            {
              titulo: 'Por Facturar',
              url: '/servicio-list/pendientes',
            },
            {
              titulo: 'Facturados',
              url: '/servicio-list/facturados',
            }
          ]
        },
      ]
    },
    {
      titulo: 'Factura',
      icono: 'mdi mdi-cash-multiple',
      submenu: [
        {
          titulo: 'Registrar',
          url: '/factura-register',
        },
        {
          titulo: 'Buscar',
          url: '/',
          submenu: [
            {
              titulo: 'Todas',
              url: '/factura-list/todas'
            },
            {
              titulo: 'Pendientes',
              url: '/factura-list/pendientes',
            },
            {
              titulo: 'Numero de Factura',
              url: '/factura-list/number'
            },
            {
              titulo: 'Rango de Fecha',
              url: '/factura-list/dateRange'
            }
          ]
        }
      ]
    },
    {
      titulo: 'Tabulador',
      icono: 'mdi mdi-table-large',
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
