import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../account/services/auth.service';
import { map, take } from 'rxjs';
import { StorageService } from '../account/services/storage.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  // const userData = inject(StorageService);
  const authService = inject(AuthService);
  var userData =await authService.autoLogin()
  if (userData !=null ) {
    return true;
    return router.navigate(['forbidden']);
  }
  return router.navigate(['account/login']);
};
