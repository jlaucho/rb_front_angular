import { GraficasComponent } from './graficas/graficas.component';
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
import { GraficoLineaComponent } from '../componentes/grafico-linea/grafico-linea.component';
import { WidgateComponent } from '../componentes/widgate/widgate.component';
import { WidgateService } from '../services/widgate.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ChartsModule
  ],
  providers: [
    GraficaService,
    WidgateService
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    GraficasComponent,
    ProgressComponent,
    UserComponent,
    GraficoLineaComponent,
    WidgateComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
  ]
})
export class PagesModule { }
