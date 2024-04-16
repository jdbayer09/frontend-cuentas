import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivateRoutingModule } from './activate-routing.module';
import { ActivateComponent } from './activate.component';
import { MessageModule } from 'primeng/message';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
  declarations: [
    ActivateComponent
  ],
  imports: [
    CommonModule,
    ActivateRoutingModule,
    MessageModule,
    ProgressBarModule
  ]
})
export class ActivateModule { }
