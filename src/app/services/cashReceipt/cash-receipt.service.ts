import { Injectable, Signal, computed, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UtilService } from '../util/util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CashReceipt, CashReceiptRequest, DashboardCashReceipt } from '../../interfaces/cashReceipts';
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

  deleteCashReceipt(cashReceipt: CashReceipt): Observable<MessageResponse<CashReceipt>> {
    const url  = `${ this.baseUrl }/delete/${cashReceipt.id}`;
    return this.http.delete<MessageResponse<CashReceipt>>( url, {headers: this.httpHeaders()} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }

  listAllCashReceipt(year: number, month: number): Observable<CashReceipt[]> {
    const url  = `${ this.baseUrl }/list-all?month=${month}&year=${year}`;
    return this.http.get<CashReceipt[]>( url, {headers: this.httpHeaders()} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }

  getDashboardCashReceipt(year: number, month: number): Observable<DashboardCashReceipt> {
    const url  = `${ this.baseUrl }/dashboard?month=${month}&year=${year}`;
    return this.http.get<DashboardCashReceipt>( url, {headers: this.httpHeaders()} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }
}
