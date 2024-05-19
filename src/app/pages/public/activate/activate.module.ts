import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivateRoutingModule } from './activate-routing.module';
import { ActivateComponent } from './activate.component';
import { MessageModule } from 'primeng/message';
import { ProgressBarModule } from 'primeng/progressbar';
import { StyleClassModule } from 'primeng/styleclass';


@NgModule({
  declarations: [
    ActivateComponent
  ],
  imports: [
    CommonModule,
    ActivateRoutingModule,
    MessageModule,
    ProgressBarModule,
    StyleClassModule
  ]
})
export class ActivateModule { }
