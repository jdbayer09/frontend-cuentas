import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
    FooterComponent,
    BreadcrumbComponent,
    MenuComponent,
    MenuItemComponent,
    SidebarComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    StyleClassModule,
    TooltipModule,
    RippleModule
  ],
  exports: [
    FooterComponent,
    BreadcrumbComponent,
    MenuComponent,
    MenuItemComponent,
    SidebarComponent,
    TopbarComponent
  ]
})
export class LayoutModule { }
