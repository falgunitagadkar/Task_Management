import { HttpInterceptorFn } from '@angular/common/http';

export const CredentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const reqWithCreds = req.clone({
    withCredentials: true
  });
  return next(reqWithCreds);
};
