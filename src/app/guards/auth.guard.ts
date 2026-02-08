import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {catchError, map, of} from 'rxjs';
import {UserSessionService} from '../../services/UserSessionService';

export const authGuard: CanActivateFn = () => {
  const userSession = inject(UserSessionService);
  const router = inject(Router);

  return userSession.refreshUser().pipe(
    map(() => true),
    catchError(() => {
      userSession.clear();
      router.navigate(['/user/sign-in']);
      return of(false);
    })
  );
};
