import { Component, EffectRef, Signal, computed, effect, inject } from '@angular/core';
import { AuthService } from './services/security/auth.service';
import { Router } from '@angular/router';
import { AuthStatus } from './enums';

@Component({
  selector: 'app-root',
  template: `
    @if (finishedAuthCheck()) {
      <router-outlet></router-outlet>
    } @else {
      <h1>Cargando...</h1>
    }
  `,
  styles: `
    h1 {
      padding: 25%
    }
  `
})
export class AppComponent {

  private authSV = inject( AuthService );
  private router = inject( Router );

  finishedAuthCheck:Signal<boolean> = computed<boolean>(() => {
    if ( this.authSV.authStatus() === AuthStatus.checking ) {
      return false;
    }
    return true;
  });

  private authStatusChangedEffect: EffectRef = effect(() => {
    switch( this.authSV.authStatus() ) {
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/z/dashboard', {replaceUrl: true});
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/p/login', {replaceUrl: true});
        return;
    }
  });

}
