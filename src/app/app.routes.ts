import { Routes, RouterModule } from '@angular/router';

// import { moduleOrComponent } from '';

import { PagesComponent } from './pages/pages.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    { path: '', component: PagesComponent,
    children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'progress', component: ProgressComponent },
        { path: 'graficas', component: Graficas1Component },
    ] },
    { path: 'login', component: LoginComponent },
    { path: '**', component: NopagefoundComponent },

];

export const APP_ROUTE = RouterModule.forRoot( appRoutes, { useHash: true } );
