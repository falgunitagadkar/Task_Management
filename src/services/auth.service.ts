import { Injectable } from '@angular/core';
import { IGoogleLogin, ILoginRequest } from '../components/login/models/login';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { BaseResponseModel } from '../app/common/models';
import { TokenService } from '../app/common/services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userLoggedIn: boolean = this.checkUserLoggedIn();
  private userLoggedInSubject = new BehaviorSubject<boolean>(this.userLoggedIn);
  
  constructor(private http: HttpClient, private tokenService : TokenService) {
  }

  get userLoggedIn$() {
    return this.userLoggedInSubject.asObservable();
  }

  login(userCred: ILoginRequest): Observable<boolean> {
    return this.http
      .post<BaseResponseModel<string>>(`${environment.apiUrl}/auth/login`, userCred)
      .pipe(
        tap(res => {
          this.tokenService.setToken(res.data);
          this.userLoggedInSubject.next(true);
        }),
        map(() => true),
        catchError(() => {
          this.userLoggedInSubject.next(false);
          return of(false);
        })
      );
  }

  refreshToken(): Observable<boolean> {
    return this.http.get<BaseResponseModel<string>>(
        `${environment.apiUrl}/auth/refresh`,{ withCredentials : true })
      .pipe(
        // 1) tap for side‑effects: store new JWT and mark user logged in
        tap(res => {
          this.tokenService.setToken(res.data);
          this.userLoggedInSubject.next(true);
        }),
        map(() => true),
        catchError(() => {
          this.userLoggedInSubject.next(false);
          return of(false);
        })
      );
  }

  googleLogin(token : IGoogleLogin): Observable<boolean> {
    return this.http.post<BaseResponseModel<string>>(
      `${environment.apiUrl}/auth/google-login`, token)
    .pipe(
      tap(res => {
        this.tokenService.setToken(res.data);
        this.userLoggedInSubject.next(true);
      }),
      map(() => true),
      catchError(() => {
        this.userLoggedInSubject.next(false);
        return of(false);
      })
    );
  }


  logout() {
    this.tokenService.clearToken();
    this.userLoggedIn = false; // Update the variable
    this.userLoggedInSubject.next(this.userLoggedIn);
  }

  checkUserLoggedIn(): boolean {
    const token = this.tokenService.getToken();
    if (token) {
      // Optionally, you can add logic to check if the token is valid (e.g., not expired)
      return true;
    }
    return false;
  }
}
