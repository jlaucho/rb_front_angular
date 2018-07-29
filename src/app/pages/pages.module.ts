import { GraficasComponent } from './graficas/graficas.component';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { GraficaService } from '../services/grafica.service';
import { ChartsModule } from 'ng2-charts';
import { GraficoLineaComponent } from '../componentes/grafico-linea/grafico-linea.component';
import { WidgateComponent } from '../componentes/widgate/widgate.component';
import { WidgateService } from '../services/widgate.service';
import { ValidatorsService } from '../services/validators.service';

import { UserRegisterComponent } from './user/register/user-register.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TablaComponent } from '../componentes/tabla/tabla.component';
import { UserListComponent } from './user/user-list/user-list.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    GraficaService,
    WidgateService,
    ValidatorsService
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    GraficasComponent,
    ProgressComponent,
    GraficoLineaComponent,
    WidgateComponent,
    UserRegisterComponent,
    TablaComponent,
    UserListComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
  ]
})
export class PagesModule { }
