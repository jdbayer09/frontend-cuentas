import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StyleClassModule } from 'primeng/styleclass';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { MessageModule } from 'primeng/message';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StyleClassModule,
    RouterModule,
    RegisterRoutingModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ProgressBarModule,
    RippleModule,
    MessageModule
  ]
})
export class RegisterModule { }
