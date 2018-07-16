import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { GraficaService } from '../services/grafica.service';
import { ChartsModule } from 'ng2-charts';
import { GraficasComponent } from './graficas/graficas.component';






@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ChartsModule
  ],
  providers: [
    GraficaService
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    UserComponent,
    GraficasComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraficasComponent
  ]
})
export class PagesModule { }
