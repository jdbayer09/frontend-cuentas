import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoriesService } from '../../services/categories/categories.service';
import { Observable } from 'rxjs';
import { MessageResponse } from '../../interfaces/base/messageRespones.interface';
import { BaseCategory, Category, CategoryRequest } from '../../interfaces/categories';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.scss'
})
export class CategoryModalComponent implements OnInit{


  //! Inyecciones
  private config      = inject(DynamicDialogConfig);
  private ref         = inject(DynamicDialogRef);
  private categorySV  = inject(CategoriesService);
  private formBuilder = inject(FormBuilder);
  //! -----------------------------------------------

  //* Señales
  private _loading = signal<boolean>(false);
  loading = computed<boolean>(() => this._loading());

  private _type = signal<'edit' | 'create'>('create');
  type = computed<'edit' | 'create'>(() => this._type());
  private _category = signal<Category | any>(undefined);
  category = computed<Category | any>(() => this._category());
  //*------------------------------------------------

  formCategory: FormGroup = this.formBuilder.group({});



  ngOnInit(): void {
    this._type.set(this.config.data.type);
    if (this.type() === 'edit') {
      this._category.set(this.config.data.category);
    }
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
    setTimeout(() => {
      observable.subscribe({
        next: resp => {
          this.ref.close({categoryResponse: resp})
        },
        error: err => {
          //TODO: Mensaje en de error en Modal
          this._loading.set(false);
        }
      });
    }, 500);
  }
}
