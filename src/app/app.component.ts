import { Component, Signal, computed, inject } from '@angular/core';
import { AuthService } from './services/security/auth.service';
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

  finishedAuthCheck:Signal<boolean> = computed<boolean>(() => {
    if ( this.authSV.authStatus() === AuthStatus.checking ) {
      return false;
    }
    return true;
  });
}
