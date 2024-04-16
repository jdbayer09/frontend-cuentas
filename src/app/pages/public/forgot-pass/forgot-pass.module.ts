import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPassRoutingModule } from './forgot-pass-routing.module';
import { ForgotPassComponent } from './forgot-pass.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StyleClassModule } from 'primeng/styleclass';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { RippleModule } from 'primeng/ripple';
import { MessageModule } from 'primeng/message';


@NgModule({
  declarations: [
    ForgotPassComponent
  ],
  imports: [
    CommonModule,
    ForgotPassRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StyleClassModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
    ProgressBarModule,
    RippleModule,
    MessageModule
  ]
})
export class ForgotPassModule { }
