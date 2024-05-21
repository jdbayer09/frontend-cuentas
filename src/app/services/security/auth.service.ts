import { Injectable, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { AuthStatus, StorageKeys } from '../../enums';
import { StorageService } from '../util/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { CheckTokenResponse, LoginRequest, LoginResponse, UserBaseData } from '../../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = environment.api_url;

  private storage = inject(StorageService);
  private http = inject( HttpClient );
  private router = inject(Router);

  private _currentUser: WritableSignal<UserBaseData | null> = signal<UserBaseData | null>(null);
  private _authStatus: WritableSignal<AuthStatus>           = signal<AuthStatus>( AuthStatus.checking );

  //! Al mundo exterior
  currentUser: Signal<UserBaseData | null> = computed( () => this._currentUser() );
  authStatus: Signal<AuthStatus> = computed( () =>
    this._authStatus()
   );

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  login( loginRequest: LoginRequest ): Observable<boolean> {
    const url  = `${ this.baseUrl }/login`;
    loginRequest.email = loginRequest.email.toLocaleLowerCase();
    return this.http.post<LoginResponse>( url, loginRequest )
      .pipe(
        map( ({ user, token, expirationToken }) => this.setAuthentication( user, token, expirationToken )),
        catchError( err => throwError( () => err.error.errorMessage ))
      );
  }

  logout(navigate: boolean = false) {
    this.storage.remove(StorageKeys.USER_INFO_TOKEN);
    this.storage.remove(StorageKeys.USER_INFO);
    this.storage.remove(StorageKeys.USER_INFO_EXPIRATION_TOKEN);

    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );
    localStorage.setItem('LOGOUT', Date.now().toString());
    if (navigate) {
      this.router.navigateByUrl('/p/login', {replaceUrl: true});
      window.location.reload();
    }
  }

  private listenForLogout() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'LOGOUT') {
        window.close();
      }
    });
  }

  private checkAuthStatus(): Observable<boolean> {
    const token = this.storage.get<string>(StorageKeys.USER_INFO_TOKEN);
    if ( !token ) {
      this.logout();
      return of(false);
    } else {
      const url   = `${ this.baseUrl }/security/validate-session`;

      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${ token }`);
      return this.http.get<CheckTokenResponse>(url, { headers })
        .pipe(
          map( ({ user, token, expirationToken}) => this.setAuthentication( user, token, expirationToken )),
          catchError((err) => {
            this._authStatus.set( AuthStatus.notAuthenticated );
            this.logout(true);
            return of(err);
          })
        );
    }
  }

  private setAuthentication(user: UserBaseData, token:string, expirationToken: string): boolean {
    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    this.storage.set(StorageKeys.USER_INFO_TOKEN, token);
    this.storage.set(StorageKeys.USER_INFO, user);
    this.storage.set(StorageKeys.USER_INFO_EXPIRATION_TOKEN, expirationToken);
    this.listenForLogout();
    return true;
  }
}
