import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import {  Observable, of, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.userLoggedIn$.pipe(
      take(1), 
      switchMap(isLoggedIn => {
        const isPublicPage = state.url === '/login' || state.url === '/';
        if (isPublicPage) {
          if (isLoggedIn) {
            return of(this.router.createUrlTree(['/list']));
          }
         
          return of(true);
        } else {
        
          if (isLoggedIn) {
            return of(true);
          }
          return of(this.router.createUrlTree(['/login']));
        }
      })
    );
  }
}
