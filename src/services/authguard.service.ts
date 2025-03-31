import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, Observable, Subscription } from "rxjs";

@Injectable({
    providedIn : "root"
})
export class AuthGuardService implements CanActivate
{
    constructor(private authService : AuthService, private router : Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean>
    {
        return this.authService.userLoggedIn$.pipe(
            map(isLoggedIn => {
              if (state.url === '/login') {
                if (!isLoggedIn) {
                  return true;
                } else {
                  this.router.navigate(['/list']);
                  return false;
                }
              } else {
                if (isLoggedIn) {
                  return true;
                } else {
                  this.router.navigate(['/']);
                  return false;
                }
              }
            })
          );
    }
}