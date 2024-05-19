import { Injectable, Signal, computed, inject } from '@angular/core';
import { UtilService } from '../util/util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { MessageResponse } from '../../interfaces/base/messageRespones.interface';
import { BasePaymentMethod, PaymentMethod, PaymentMethodRequest } from '../../interfaces/paymentMethods';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  //! Inyecciones
  private utilSV = inject(UtilService);
  private http = inject(HttpClient);
  //! -----------------------------------------------------------------

  //? Variables
  private readonly baseUrl: string = environment.api_url + '/payment-method';
  //? -----------------------------------------------------------------

  //* Señales
  private httpHeaders: Signal<HttpHeaders> = computed( () => this.utilSV.getHeaders() );
  //*------------------------------------------------------------------

  listAllPaymentMethods(): Observable<PaymentMethod[]> {
    const url  = `${ this.baseUrl }/list-all`;
    return this.http.get<PaymentMethod[]>( url, {headers: this.httpHeaders()} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }

  disablePaymentMethod(paymentMethod: PaymentMethod): Observable<MessageResponse<number>> {
    const url  = `${ this.baseUrl }/delete/${paymentMethod.id}`;
    return this.http.delete<MessageResponse<number>>( url, {headers: this.httpHeaders()} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }

  enablePaymentMethod(paymentMethod: PaymentMethod): Observable<MessageResponse<number>> {
    const url  = `${ this.baseUrl }/enable/${paymentMethod.id}`;
    return this.http.patch<MessageResponse<number>>( url, {}, {headers: this.httpHeaders()} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }

  createPaymentMethod(request: PaymentMethodRequest): Observable<MessageResponse<BasePaymentMethod>> {
    const url  = `${ this.baseUrl }/create`;
    return this.http.post<MessageResponse<BasePaymentMethod>>( url, request, {headers: this.httpHeaders()} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }

  updatePaymentMethod(paymentMethod: PaymentMethod, request: PaymentMethodRequest): Observable<MessageResponse<BasePaymentMethod>> {
    const url  = `${ this.baseUrl }/update/${paymentMethod.id}`;
    return this.http.put<MessageResponse<BasePaymentMethod>>( url, request, {headers: this.httpHeaders()} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }
}
