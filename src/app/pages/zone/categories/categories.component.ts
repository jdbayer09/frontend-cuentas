import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CategoriesService } from '../../../services/categories/categories.service';
import { BaseCategory, Category } from '../../../interfaces/categories';
import { Table } from 'primeng/table';
import { UtilService } from '../../../services/util/util.service';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { MessageResponse } from '../../../interfaces/base/messageRespones.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  //! Inyecciones
  private categorySV = inject(CategoriesService);
  private utilSV     = inject(UtilService);
  private confirmSV  = inject(ConfirmationService);
  //! -----------------------------------------------

  //* Señales
  private _loading = signal<boolean>(false);
  loading = computed<boolean>(() => this._loading());

  private _listCategories = signal<Category[]>([]);
  listCategories = computed<Category[]>(() => this._listCategories());
  //*------------------------------------------------

  //? Variables

  //? -----------------------------------------------

  ngOnInit(): void {
    this.loadListCategories();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  loadListCategories() {
    this._loading.set(true);
    setTimeout(() => {
      this.categorySV.listAllCategories().subscribe({
        next: resp => {
          this._loading.set(false);
          this._listCategories.set(resp);
        },
        error: err => {
          this.utilSV.setMessage('¡Error!', err, 'error');
          this._loading.set(false);
        }
      });
    }, 500);
  }

  newCategory() {

  }

  editCategory(category: Category) {

  }

  enableCategory(category: Category) {
    this.utilSV.confirm({
      message: `¿Esta seguro que desea habilitar la categoría: "<b>${category.name}</b>" ?`,
      accept: () => {
        this.serviceAction(this.categorySV.enableCategory(category));
      }
    });
  }

  disableCategory(category: Category) {
    this.utilSV.confirm({
      message: `¿Esta seguro que desea deshabilitar la categoría: "<b>${category.name}</b>" ?`,
      accept: () => {
        this.serviceAction(this.categorySV.disableCategory(category));
      }
    });
  }

  private serviceAction(observable: Observable<MessageResponse<number | BaseCategory>>) {
    this._loading.set(true);
    setTimeout(() => {
      observable.subscribe({
        next: resp => {
          this.utilSV.setMessage(resp.tittle, resp.message, 'success');
          this.loadListCategories();
        },
        error: err => {
          this.utilSV.setMessage('¡Error!', err, 'error');
          this._loading.set(false);
        }
      });
    }, 500);
  }


}
