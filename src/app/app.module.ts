import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';

// Rutas de la aplicacion
import { APP_ROUTE } from './app.routes';
// import { RouterModule } from '@angular/router';

// Modulos
import { PagesModule } from './pages/pages.module';
import { LoginModule } from './login/login.module';


import { AppComponent } from './app.component';
// import { LoginComponent } from './login/login.component';

// import { UserService } from './services/user.service';
// import { CommonModule } from '@angular/common';
// import { SidebarService } from './services/sidebar.service';
import { SharedModule } from './shared/shared.module';
// import { UserService } from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
  ],
  imports: [
    // RouterModule,
    BrowserModule,
    // FormsModule,
    // HttpClientModule,
    // ReactiveFormsModule,
    PagesModule,
    SharedModule,
    // CommonModule,
    LoginModule,
    // LoginModule,
    APP_ROUTE
  ],
  providers: [
    // UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
