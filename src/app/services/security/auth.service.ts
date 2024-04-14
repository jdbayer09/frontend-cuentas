import { Injectable, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { AuthStatus, StorageKeys } from '../../enums';
import { StorageService } from '../util/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = environment.api_url;

  private storage = inject(StorageService);
  private http = inject( HttpClient );

  private _currentUser: WritableSignal<UserBaseData | null> = signal<UserBaseData | null>(null);
  private _authStatus: WritableSignal<AuthStatus>           = signal<AuthStatus>( AuthStatus.checking );

  //! Al mundo exterior
  currentUser: Signal<UserBaseData | null> = computed( () => this._currentUser() );
  authStatus: Signal<AuthStatus> = computed( () => this._authStatus() );

  constructor() {
    this.checkAuthStatus();
  }


  login( email: string, password: string ): Observable<boolean> {
    const url  = `${ this.baseUrl }/login`;
    const body = { email, password };
    return this.http.post<LoginResponse>( url, body )
      .pipe(
        map( ({ user, token, expirationToken }) => this.setAuthentication( user, token, expirationToken )),
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }


  logout() {
    this.storage.remove(StorageKeys.USER_INFO_TOKEN);
    this.storage.remove(StorageKeys.USER_INFO);
    this.storage.remove(StorageKeys.USER_INFO_EXPIRATION_TOKEN);

    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );
  }


  private checkAuthStatus(): void {
    const token = this.storage.get<string>(StorageKeys.USER_INFO_TOKEN);

    if ( !token ) {
      this.logout();
      return;
    } else {
      const url   = `${ this.baseUrl }/security/validate-session`;

      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${ token }`);
      this.http.get<CheckTokenResponse>(url, { headers })
        .pipe(
          map( ({ user, token, expirationToken}) => this.setAuthentication( user, token, expirationToken )),
          catchError((err) => {
            this._authStatus.set( AuthStatus.notAuthenticated );
            this.logout();
            return of(err);
          })
        ).subscribe();
    }
  }

  private setAuthentication(user: UserBaseData, token:string, expirationToken: string): boolean {
    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );

    this.storage.set(StorageKeys.USER_INFO_TOKEN, token);
    this.storage.set(StorageKeys.USER_INFO, user);
    this.storage.set(StorageKeys.USER_INFO_EXPIRATION_TOKEN, expirationToken);

    return true;
  }
}

export interface UserBaseData {
  id: number;
  fullName: string;
  email: string;
}

export interface CheckTokenResponse {
  user:  UserBaseData;
  token: string;
  expirationToken: string;
}

export interface LoginResponse {
  user:  UserBaseData;
  token: string;
  expirationToken: string;
}
