import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const router = inject(Router);

  const PUBLIC_ROUTES = ['/', '/login', '/pricing', '/features'];

  return next(req).pipe(
    catchError(err => {
      if (err instanceof HttpErrorResponse && err.status === 401) {

        if (req.url.includes('/auth/refresh')) {
          authService.logout();
          
          const currentRoute = router.url;
          const isOnPublicRoute = PUBLIC_ROUTES.includes(currentRoute);

          if(!isOnPublicRoute)
          {
            router.navigate(['/login']);
          }
          return throwError(() => err);
        }

        return authService.refreshToken().pipe(
          switchMap(success => {
            if (success) {
              return next(req);
            } else {
              router.navigate(['/login']);
              return throwError(() => err);
            }
          }),
          catchError(innerErr => {
            router.navigate(['/login']);
            return throwError(() => innerErr);
          })
        );
      }
      return throwError(() => err);
    })
  );
};