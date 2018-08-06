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
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: PagesComponent,
    canActivate: [ LoginGuardGuard ],
    children: [
        // tslint:disable-next-line:max-line-length
        { path: 'dashboard', canActivate: [ LoginGuardGuard ], component: DashboardComponent,
                data: {title: 'Dashboard', izquierda: 'Principal', medio: 'pagina', derecha: 'Dashboard'}},
        { path: 'progress', canActivate: [ LoginGuardGuard ], component: ProgressComponent,
                data: {title: 'Dashboard', izquierda: 'Principal', medio: 'pagina', derecha: 'Dashboard'} },
        { path: 'graficas', canActivate: [ LoginGuardGuard ], component: GraficasComponent ,
                data: {title: 'Dashboard', izquierda: 'Principal', medio: 'pagina', derecha: 'Dashboard'}},
        { path: 'user-register', canActivate: [ LoginGuardGuard ], component: UserRegisterComponent, data:
                {title: 'Registro de usuario', izquierda: 'Pagina', medio: 'Usuario', derecha: 'Registrar'} },
        { path: 'user-list/:tipo', canActivate: [ LoginGuardGuard ], component: UserListComponent, data:
                {title: 'Lista de usuarios', izquierda: 'Pagina', medio: 'Usuario', derecha: 'Listar'} },
        { path: 'user-update/:idUser', canActivate: [ LoginGuardGuard ], component: UserUpdateComponent, data:
                        {title: 'Actualización de usuario', izquierda: 'Pagina', medio: 'Usuario', derecha: 'Actualizar'} },
        { path: 'empresa-register', canActivate: [ LoginGuardGuard ], component: EmpresaRegisterComponent, data:
                {title: 'Registro de empresas', izquierda: 'Pagina', medio: 'Empresa', derecha: 'Registar'} },
        { path: 'empresa-list', canActivate: [ LoginGuardGuard ], component: EmpresaListComponent, data:
                {title: 'Listado de empresas', izquierda: 'Pagina', medio: 'Empresa', derecha: 'Listar'} },
        { path: 'empresa-update/:idEmpresa', canActivate: [ LoginGuardGuard ], component: EmpresaUpdateComponent, data:
                {title: 'Listado de empresas', izquierda: 'Pagina', medio: 'Empresa', derecha: 'Listar'} },
        { path: '', component: DashboardComponent },
    ] },
    { path: '**', component: NopagefoundComponent },

];

export const APP_ROUTE = RouterModule.forRoot( appRoutes, { useHash: true } );
