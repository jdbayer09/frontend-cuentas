import { Injectable, Signal, computed, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UtilService } from '../util/util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CashReceipt, CashReceiptRequest } from '../../interfaces/cashReceipts';
import { MessageResponse } from '../../interfaces/base/messageRespones.interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashReceiptService {
  //! Inyecciones
  private utilSV = inject(UtilService);
  private http = inject(HttpClient);
  //! -----------------------------------------------------------------

  //? Variables
  private readonly baseUrl: string = environment.api_url + '/cash-receipt';
  //? -----------------------------------------------------------------

  //* Señales
  private httpHeaders: Signal<HttpHeaders> = computed( () => this.utilSV.getHeaders() );
  //*------------------------------------------------------------------

  createCashReceipt(request: CashReceiptRequest): Observable<MessageResponse<CashReceipt>> {
    const url  = `${ this.baseUrl }/create`;
    return this.http.post<MessageResponse<CashReceipt>>( url, request, {headers: this.httpHeaders()} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }

  updateCashReceipt(cashReceipt: CashReceipt, request: CashReceiptRequest): Observable<MessageResponse<CashReceipt>> {
    const url  = `${ this.baseUrl }/update/${cashReceipt.id}`;
    return this.http.put<MessageResponse<CashReceipt>>( url, request, {headers: this.httpHeaders()} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }

  payCashReceipt(cashReceipt: CashReceipt): Observable<MessageResponse<CashReceipt>> {
    const url  = `${ this.baseUrl }/pay/${cashReceipt.id}`;
    return this.http.put<MessageResponse<CashReceipt>>( url, {}, {headers: this.httpHeaders()} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }

  listAllCashReceipt(): Observable<CashReceipt[]> {
    const url  = `${ this.baseUrl }/list-all`;
    return this.http.get<CashReceipt[]>( url, {headers: this.httpHeaders()} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }
}
