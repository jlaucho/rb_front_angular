import { Routes, RouterModule } from '@angular/router';


// import { moduleOrComponent } from '';

import { PagesComponent } from './pages/pages.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { GraficasComponent } from './pages/graficas/graficas.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';


import { LoginComponent } from './login/login.component';
import { UserRegisterComponent } from './pages/user/register/user-register.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { EmpresaRegisterComponent } from './pages/empresa/empresa-register/empresa-register.component';
import { EmpresaListComponent } from './pages/empresa/empresa-list/empresa-list.component';
import { UserUpdateComponent } from './pages/user/user-update/user-update.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { EmpresaUpdateComponent } from './pages/empresa/empresa-update/empresa-update.component';
import { TabuladorComponent } from './pages/tabulador/register/tabulador.component';
import { TabuladorListComponent } from './pages/tabulador/tabulador-list/tabulador-list.component';
import { ServicioRegisterComponent } from './pages/servicios/servicio-register/servicio-register.component';
import { ServicioListComponent } from './pages/servicios/servicio-list/servicio-list.component';
import { ServicioUpdateComponent } from './pages/servicios/servicio-update/servicio-update.component';
import { VerifyTokenGuard } from './services/guards/verify-token.guard';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },

    { path: '', component: PagesComponent,
//     canActivate: [ LoginGuardGuard ],
    canActivateChild: [ VerifyTokenGuard ],
    children: [
        // tslint:disable-next-line:max-line-length
        { path: 'dashboard', component: DashboardComponent,
                data: {title: 'Dashboard', izquierda: 'Principal', medio: 'pagina', derecha: 'Dashboard'}},
        { path: 'progress', component: ProgressComponent,
                data: {title: 'Dashboard', izquierda: 'Principal', medio: 'pagina', derecha: 'Dashboard'} },
        { path: 'graficas', component: GraficasComponent ,
                data: {title: 'Dashboard', izquierda: 'Principal', medio: 'pagina', derecha: 'Dashboard'}},
        { path: 'user-register', component: UserRegisterComponent,
                data: {title: 'Registro de usuario', izquierda: 'Pagina', medio: 'Usuario', derecha: 'Registrar'} },
        { path: 'user-list/:tipo', component: UserListComponent, data:
                {title: 'Lista de usuarios', izquierda: 'Pagina', medio: 'Usuario', derecha: 'Listar'} },
        { path: 'user-update/:idUser', component: UserUpdateComponent, data:
                {title: 'Actualización de usuario', izquierda: 'Pagina', medio: 'Usuario', derecha: 'Actualizar'} },
        { path: 'empresa-register', component: EmpresaRegisterComponent, data:
                {title: 'Registro de empresas', izquierda: 'Pagina', medio: 'Empresa', derecha: 'Registar'} },
        { path: 'empresa-list', component: EmpresaListComponent, data:
                {title: 'Listado de empresas', izquierda: 'Pagina', medio: 'Empresa', derecha: 'Listar'} },
        { path: 'empresa-update/:idEmpresa', component: EmpresaUpdateComponent, data:
                {title: 'Listado de empresas', izquierda: 'Pagina', medio: 'Empresa', derecha: 'Listar'} },
        { path: 'tabulador-register', component: TabuladorComponent, data:
                {title: 'Registro de Tabulador', izquierda: 'Pagina', medio: 'Tabulador', derecha: 'Registrar'} },
        { path: 'tabulador-list/:tipo', component: TabuladorListComponent, data:
                {title: 'Registro de Tabulador', izquierda: 'Pagina', medio: 'Tabulador', derecha: 'Lista'} },
        { path: 'servicio-register', component: ServicioRegisterComponent, data:
                {title: 'Registro de Servicio', izquierda: 'Pagina', medio: 'Servicio', derecha: 'Registro'} },
        { path: 'servicio-update/:idServicio', component: ServicioUpdateComponent, data:
                {title: 'Actualizacion de Servicio', izquierda: 'Pagina', medio: 'Servicio', derecha: 'Actualizar'} },
        { path: 'servicio-list/:parametro', component: ServicioListComponent, data:
                {title: 'Listado de Servicios', izquierda: 'Pagina', medio: 'Servicio', derecha: 'Lista'} },
        { path: '', component: DashboardComponent },
    ] },
    { path: '**', component: NopagefoundComponent },

];

export const APP_ROUTE = RouterModule.forRoot( appRoutes, { useHash: true } );
