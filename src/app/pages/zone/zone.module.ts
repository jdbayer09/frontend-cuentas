import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZoneRoutingModule } from './zone-routing.module';
import { ZoneComponent } from './zone.component';
import { LayoutModule } from '../../layout/layout.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    ZoneComponent
  ],
  imports: [
    CommonModule,
    ZoneRoutingModule,
    LayoutModule,
    ToastModule
  ]
})
export class ZoneModule { }
