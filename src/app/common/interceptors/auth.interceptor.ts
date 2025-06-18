import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService)
  const token = tokenService.getToken();

  // if (req.url.includes('/auth/login')) {
  //   return next(req);
  // }

  if(token)
  {
    const cloned = req.clone({
      setHeaders : {
        Authorization : `Bearer ${token}`
      }
    });

    return next(cloned);
  }
  return next(req);
};
