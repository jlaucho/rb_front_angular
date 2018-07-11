import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../services/sidebar.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NopagefoundComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent
  ],
  exports: [
    NopagefoundComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent
  ],
  providers: [
    SidebarService
  ]
})
export class SharedModule { }
