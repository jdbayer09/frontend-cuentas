import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CategoriesService } from '../../../services/categories/categories.service';
import { CategoryRequest, CategoryResponse } from '../../../interfaces/categories';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  //! Inyecciones
  private categorySV = inject(CategoriesService);
  //! -----------------------------------------------

  //* Señales
  private _loading = signal<boolean>(false);
  loading = computed<boolean>(() => this._loading());

  private _error = signal<string | null >(null);
  error = computed<string | null>(() => this._error());

  private _listCategories = signal<CategoryResponse[]>([]);
  listCategories = computed<CategoryResponse[]>(() => this._listCategories());
  //*------------------------------------------------

  //? Variables

  //? -----------------------------------------------

  ngOnInit(): void {
    this.loadListCategories();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  newCategory() {

  }

  enableCategory(category: CategoryRequest) {

  }

  disableCategory(category: CategoryRequest) {

  }

  editCategory(category: CategoryRequest) {

  }

  private loadListCategories() {
    this._loading.set(true);
    this._error.set(null);
    setTimeout(() => {
      this.categorySV.listAllCategories().subscribe({
        next: resp => {
          this._loading.set(false);
          this._listCategories.set(resp);
        },
        error: err => {
          this._error.set(err);
          this._loading.set(false);
        }
      });
    }, 500);
  }
}
