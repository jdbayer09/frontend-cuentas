import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { CategoriesService } from '../../../services/categories/categories.service';
import { BaseCategory, Category } from '../../../interfaces/categories';
import { Table } from 'primeng/table';
import { UtilService } from '../../../services/util/util.service';
import { Observable } from 'rxjs';
import { MessageResponse } from '../../../interfaces/base/messageRespones.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryModalComponent } from '../../../modals/category-modal/category-modal.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy{
  //! Inyecciones
  private categorySV  = inject(CategoriesService);
  private utilSV      = inject(UtilService);
  private dialogSV    = inject(DialogService);

  //! -----------------------------------------------

  //* Señales
  private _loading = signal<boolean>(false);
  loading = computed<boolean>(() => this._loading());

  private _listCategories = signal<Category[]>([]);
  listCategories = computed<Category[]>(() => this._listCategories());

  private _modalCategoryRef = signal<DynamicDialogRef | undefined>(undefined);
  modalCategoryRef = computed<DynamicDialogRef | undefined>(() => this._modalCategoryRef());
  //*------------------------------------------------

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


  openModalCategories(type: 'edit' | 'create', category?: Category) {
    this._modalCategoryRef.set(this.dialogSV.open(CategoryModalComponent,{
      header: `${(type === 'edit'? 'Actualizar' : 'Nueva')} Categoría` ,
      width: '40rem',
      closable: false,
      data: {
        type,
        category
      }
    }));
    this.modalCategoryRef()?.onClose.subscribe((resp: {categoryResponse: MessageResponse<number | BaseCategory>}) => {
      if (resp && resp.categoryResponse) {
        this.utilSV.setMessage(resp.categoryResponse.tittle, resp.categoryResponse.message, 'success');
        this.loadListCategories();
      }
      this._modalCategoryRef.set(undefined);
    });
  }

  ngOnDestroy(): void {
    if(this.modalCategoryRef()) {
      this.modalCategoryRef()?.close();
      this._modalCategoryRef.set(undefined);
    }
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
