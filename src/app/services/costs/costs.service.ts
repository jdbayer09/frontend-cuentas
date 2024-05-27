import { Injectable, Signal, computed, inject } from '@angular/core';
import { UtilService } from '../util/util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Cost, CostRequest } from '../../interfaces/costs';
import { MessageResponse } from '../../interfaces/base/messageRespones.interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CostsService {
  //! Inyecciones
  private utilSV = inject(UtilService);
  private http = inject(HttpClient);
  //! -----------------------------------------------------------------

  //? Variables
  private readonly baseUrl: string = environment.api_url + '/cost';
  //? -----------------------------------------------------------------

  //* Señales
  private httpHeaders: Signal<HttpHeaders> = computed( () => this.utilSV.getHeaders() );
  //*------------------------------------------------------------------



  createCost(request: CostRequest): Observable<MessageResponse<Cost>> {
    const url  = `${ this.baseUrl }/create`;
    return this.http.post<MessageResponse<Cost>>( url, request, {headers: this.httpHeaders()} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }

  updateCost(cost: Cost, request: CostRequest): Observable<MessageResponse<Cost>> {
    const url  = `${ this.baseUrl }/update/${cost.id}`;
    return this.http.put<MessageResponse<Cost>>( url, request, {headers: this.httpHeaders()} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }
}
