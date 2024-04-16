import { Injectable, Signal, computed, inject } from '@angular/core';
import { UtilService } from '../util/util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { CategoryResponse } from '../../interfaces/categories';

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

  listAllCategories(): Observable<CategoryResponse[]> {
    const url  = `${ this.baseUrl }/list-all`;
    return this.http.get<CategoryResponse[]>( url, {headers: this.httpHeaders()} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }
}
