import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryModalComponent } from './category-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [
    CategoryModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ButtonModule,
    ProgressBarModule
  ],
  exports: [
    CategoryModalComponent
  ]
})
export class CategoryModalModule { }
