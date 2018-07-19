import { Routes, RouterModule } from '@angular/router';


// import { moduleOrComponent } from '';

import { PagesComponent } from './pages/pages.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { GraficasComponent } from './pages/graficas/graficas.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';


import { LoginComponent } from './login/login.component';
import { UserRegisterComponent } from './pages/user/register/user-register.component';
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: PagesComponent,
    children: [
        // tslint:disable-next-line:max-line-length
        { path: 'dashboard', component: DashboardComponent,
                data: {title: 'Dashboard', izquierda: 'Principal', medio: 'pagina', derecha: 'Dashboard'}},
        { path: 'progress', component: ProgressComponent,
                data: {title: 'Dashboard', izquierda: 'Principal', medio: 'pagina', derecha: 'Dashboard'} },
        { path: 'graficas', component: GraficasComponent ,
                data: {title: 'Dashboard', izquierda: 'Principal', medio: 'pagina', derecha: 'Dashboard'}},
        { path: 'user-register', component: UserRegisterComponent, data:
                {title: 'Usuario', izquierda: 'Pagina', medio: 'Usuario', derecha: 'Registrar'} },
        { path: '', component: DashboardComponent },
    ] },
    { path: '**', component: NopagefoundComponent },

];

export const APP_ROUTE = RouterModule.forRoot( appRoutes, { useHash: true } );
