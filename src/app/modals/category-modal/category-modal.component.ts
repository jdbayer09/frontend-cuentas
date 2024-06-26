import { Component, computed, inject, signal } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoriesService } from '../../services/categories/categories.service';
import { Observable } from 'rxjs';
import { MessageResponse } from '../../interfaces/base/messageRespones.interface';
import { BaseCategory, Category, CategoryRequest } from '../../interfaces/categories';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COLORS, ICONS } from '../../data';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.scss'
})
export class CategoryModalComponent {

  listColors = COLORS;
  listIcons = ICONS;

  //! Inyecciones
  private config      = inject(DynamicDialogConfig);
  private ref         = inject(DynamicDialogRef);
  private categorySV  = inject(CategoriesService);
  private formBuilder = inject(FormBuilder);
  //! -----------------------------------------------

  //* Señales
  private _loading = signal<boolean>(false);
  loading = computed<boolean>(() => this._loading());

  private _type = signal<'edit' | 'create'>(this.config.data.type);
  type = computed<'edit' | 'create'>(() => this._type());
  private _category = signal<Category>(this.config.data.category);
  category = computed<Category>(() => this._category());

  private _error = signal<string | null>(null);
  error = computed<string | null>(() => this._error());
  //*------------------------------------------------

  formCategory!: FormGroup;

  constructor() {
    this.buildForm();
  }

  saveAction() {
    const data:CategoryRequest = this.formCategory.value;
    if (this.type() === 'edit' && this.category()) {
      this.serviceAction(this.categorySV.updateCategory(this.category(), data));
    } else if (this.type() === 'create') {
      this.serviceAction(this.categorySV.createCategory(data));
    }
  }


  private serviceAction(observable: Observable<MessageResponse<BaseCategory>>) {
    this._loading.set(true);
    this._error.set(null);
    this.formCategory.disable();
    setTimeout(() => {
      observable.subscribe({
        next: resp => {
          this.ref.close({categoryResponse: resp})
        },
        error: err => {
          this._error.set(err);
          this._loading.set(false);
          this.formCategory.enable();
        }
      });
    }, 500);
  }
  closeModal() {
    this.ref.close();
  }

  private buildForm() {
    this.formCategory = this.formBuilder.group({
      name: [
        this.category()?.name ?? null,
        [
          Validators.required,
          Validators.maxLength(60)
        ]
      ],
      description: [
        this.category()?.description ?? null,
        []
      ],
      color: [
        this.category()?.color ?? null,
        [
          Validators.required,
          Validators.maxLength(16)
        ]
      ],
      icon: [
        this.category()?.icon ?? null,
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ]
    });
    this.formCategory.enable();
  }

}
