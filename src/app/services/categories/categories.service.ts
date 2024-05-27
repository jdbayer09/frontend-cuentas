import { Injectable, Signal, computed, inject } from '@angular/core';
import { UtilService } from '../util/util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { BaseCategory, Category, CategoryRequest } from '../../interfaces/categories';
import { MessageResponse } from '../../interfaces/base/messageRespones.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  //! Inyecciones
  private utilSV = inject(UtilService);
  private http = inject(HttpClient);
  //! -----------------------------------------------------------------

  //? Variables
  private readonly baseUrl: string = environment.api_url + '/category';
  //? -----------------------------------------------------------------

  //* Señales
  private httpHeaders: Signal<HttpHeaders> = computed( () => this.utilSV.getHeaders() );
  //*------------------------------------------------------------------

  listAllCategories(): Observable<Category[]> {
    const url  = `${ this.baseUrl }/list-all`;
    return this.http.get<Category[]>( url, {headers: this.httpHeaders()} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }
  listActiveCategories(): Observable<BaseCategory[]> {
    const url  = `${ this.baseUrl }/list-active`;
    return this.http.get<Category[]>( url, {headers: this.httpHeaders()} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }

  disableCategory(category: Category): Observable<MessageResponse<number>> {
    const url  = `${ this.baseUrl }/delete/${category.id}`;
    return this.http.delete<MessageResponse<number>>( url, {headers: this.httpHeaders()} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }

  enableCategory(category: Category): Observable<MessageResponse<number>> {
    const url  = `${ this.baseUrl }/enable/${category.id}`;
    return this.http.patch<MessageResponse<number>>( url, {}, {headers: this.httpHeaders()} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }

  createCategory(request: CategoryRequest): Observable<MessageResponse<BaseCategory>> {
    const url  = `${ this.baseUrl }/create`;
    return this.http.post<MessageResponse<BaseCategory>>( url, request, {headers: this.httpHeaders()} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }

  updateCategory(category: Category, request: CategoryRequest): Observable<MessageResponse<BaseCategory>> {
    const url  = `${ this.baseUrl }/update/${category.id}`;
    return this.http.put<MessageResponse<BaseCategory>>( url, request, {headers: this.httpHeaders()} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }
}
