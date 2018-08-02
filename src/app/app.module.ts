import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Rutas de la aplicacion
import { APP_ROUTE } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';
import { LoginModule } from './login/login.module';


import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
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
