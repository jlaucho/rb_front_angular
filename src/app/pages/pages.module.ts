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
import { EmpresaRegisterComponent } from './empresa/empresa-register/empresa-register.component';
import { FuncionesGenericasService } from '../services/funciones.service';
import { EmpresaService } from '../services/empresa.service';
import { EmpresaListComponent } from './empresa/empresa-list/empresa-list.component';
import { MensajesFormsComponent } from '../componentes/mensajes-forms/mensajes-forms.component';

import { UserUpdateComponent } from './user/user-update/user-update.component';
import { EmpresaUpdateComponent } from './empresa/empresa-update/empresa-update.component';
import { PaginationService } from '../services/pagination.service';
import { TabuladorService } from '../services/tabulador.service';

import { TabuladorComponent } from './tabulador/register/tabulador.component';
import { TabuladorListComponent } from './tabulador/tabulador-list/tabulador-list.component';
import { ServicioRegisterComponent } from './servicios/servicio-register/servicio-register.component';
import { ServiciosService } from '../services/servicios.service';
import { AlertComponent } from '../componentes/alert/alert.component';
import { ServicioListComponent } from './servicios/servicio-list/servicio-list.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ServicioUpdateComponent } from './servicios/servicio-update/servicio-update.component';
import { BusquedaColeccionService } from '../services/busqueda-coleccion.service';







@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    // TooltipModule.forRoot()
  ],
  providers: [
    GraficaService,
    WidgateService,
    ValidatorsService,
    FuncionesGenericasService,
    EmpresaService,
    PaginationService,
    TabuladorService,
    ServiciosService,
    BusquedaColeccionService
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
    UserListComponent,
    EmpresaRegisterComponent,
    EmpresaListComponent,
    MensajesFormsComponent,
    UserUpdateComponent,
    EmpresaUpdateComponent,
    TabuladorComponent,
    TabuladorListComponent,
    ServicioRegisterComponent,
    AlertComponent,
    ServicioListComponent,
    ServicioUpdateComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent
  ]
})
export class PagesModule { }
