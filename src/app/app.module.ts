import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Rutas de la aplicacion
// import { RouterModule } from '@angular/router';
import { APP_ROUTE } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';
import { LoginModule } from './login/login.module';


import { AppComponent } from './app.component';
// import { LoginComponent } from './login/login.component';

import { UserService } from './services/user.service';
import { SidebarService } from './services/sidebar.service';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    // RouterModule
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    // HttpClientModule,
    // ReactiveFormsModule,
    PagesModule,
    SharedModule,
    LoginModule,
    APP_ROUTE
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
