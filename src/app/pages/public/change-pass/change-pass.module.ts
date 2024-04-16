import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePassRoutingModule } from './change-pass-routing.module';
import { ChangePassComponent } from './change-pass.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StyleClassModule } from 'primeng/styleclass';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { RippleModule } from 'primeng/ripple';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';


@NgModule({
  declarations: [
    ChangePassComponent
  ],
  imports: [
    CommonModule,
    ChangePassRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StyleClassModule,
    RouterModule,
    ButtonModule,
    ProgressBarModule,
    RippleModule,
    MessageModule,
    PasswordModule
  ]
})
export class ChangePassModule { }
