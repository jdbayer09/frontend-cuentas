import { Component, Signal, computed, inject } from '@angular/core';
import { AuthService } from './services/security/auth.service';
import { Router } from '@angular/router';

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

  private authService = inject( AuthService );
  private router = inject( Router );


  finishedAuthCheck:Signal<boolean> = computed<boolean>(() => {
    return true;
  });

}
