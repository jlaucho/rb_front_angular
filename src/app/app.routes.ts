import { Routes, RouterModule } from '@angular/router';


// import { moduleOrComponent } from '';

import { PagesComponent } from './pages/pages.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { GraficasComponent } from './pages/graficas/graficas.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { UserComponent } from './pages/user/user.component';

import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: PagesComponent,
    children: [
        // tslint:disable-next-line:max-line-length
        { path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard', izquierda: 'Principal', medio: 'pagina', derecha: 'Dashboard'}},
        { path: 'progress', component: ProgressComponent, data: {title: 'Progreso'} },
        { path: 'graficas', component: GraficasComponent , data: {title: 'Graficas'}},
        { path: 'userregister', component: UserComponent, data: {title: 'Registro'} },
    ] },
    { path: '**', component: NopagefoundComponent },

];

export const APP_ROUTE = RouterModule.forRoot( appRoutes, { useHash: true } );
