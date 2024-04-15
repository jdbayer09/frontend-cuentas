import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/security/auth.service';
import { AuthStatus } from '../../enums';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthService );
  const router      = inject( Router );

  if ( authService.authStatus() === AuthStatus.authenticated ) {
    router.navigateByUrl('/z/dashboard', {replaceUrl: true});
    return false;
  }

  return true;
};
