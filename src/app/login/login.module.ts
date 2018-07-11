import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { RouterModule } from '@angular/router';
// import { SidebarService } from '../services/sidebar.service';
import { UserService } from '../services/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // RouterModule
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    UserService,
    // SidebarService
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
