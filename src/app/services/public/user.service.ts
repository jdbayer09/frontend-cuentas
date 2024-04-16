import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RegisterUserRequest, UserBaseData } from '../../interfaces/user';
import { MessageResponse } from '../../interfaces/base/messageRespones.interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicUserService {
  private readonly baseUrl: string = environment.api_url + '/public/users';

  private http = inject( HttpClient );

  constructor() { }

  register( registerReques: RegisterUserRequest ): Observable<MessageResponse<UserBaseData>> {
    const url  = `${ this.baseUrl }/register`;
    registerReques.email = registerReques.email.toLocaleLowerCase();
    return this.http.post<MessageResponse<UserBaseData>>( url, registerReques )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }

  activate( code: String ): Observable<MessageResponse<UserBaseData>> {
    const url  = `${ this.baseUrl }/activate-user/${code}`;
    return this.http.put<MessageResponse<UserBaseData>>( url, {} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }
  forgotPass( email: String ): Observable<MessageResponse<UserBaseData>> {
    const url  = `${ this.baseUrl }/forgot-password/${email}`;
    return this.http.put<MessageResponse<UserBaseData>>( url, {} )
      .pipe(
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }
}
