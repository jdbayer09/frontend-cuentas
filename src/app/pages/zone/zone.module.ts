import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZoneRoutingModule } from './zone-routing.module';
import { ZoneComponent } from './zone.component';
import { LayoutModule } from '../../layout/layout.module';


@NgModule({
  declarations: [
    ZoneComponent
  ],
  imports: [
    CommonModule,
    ZoneRoutingModule,
    LayoutModule
  ]
})
export class ZoneModule { }
