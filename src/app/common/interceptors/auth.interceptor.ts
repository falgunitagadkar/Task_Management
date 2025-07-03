import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService)
  const authService = inject(AuthService)
  const router = inject(Router);
  const token = tokenService.getToken();

  // Add Authorization header if token exists (even for /auth/refresh)
  const requestWithToken = token
  ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
  : req;
  
  return next(requestWithToken).pipe(
    catchError(err => {
      // Handle only if: 401, not login, not already refresh
      const isAuthError = err.status === 401;
      const isLoginOrRefresh =
      req.url.includes('/auth/login') || req.url.includes('/auth/refresh');
      
      if (isAuthError && !isLoginOrRefresh) {
        return authService.refreshToken().pipe(
          switchMap(success => {
            if (success) {
              const newToken = tokenService.getToken();
              const retryReq = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` }
              });
              return next(retryReq);
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
      
      // Let login and refresh or other errors pass through
      return throwError(() => err);
    })
  );
};