import { Injectable } from '@angular/core';
import { IGoogleLogin, ILoginRequest } from '../components/login/models/login';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, map, Observable, of, take, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { BaseResponseModel } from '../app/core/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userLoggedInSubject = new BehaviorSubject<boolean | null>(null);
  public userLoggedIn$  = this.userLoggedInSubject.asObservable();

  private isRefreshing = false;

  constructor(private http: HttpClient) {
  }
 
  initAuth(): Promise<void> {
    return new Promise((resolve) => {
      this.validateToken().subscribe({
        next: isValid => {
          this.userLoggedInSubject.next(isValid);
          resolve();
        },
        error: () => {
          this.userLoggedInSubject.next(false);
          resolve();
        }
      });
    });
  }

  login(userCred: ILoginRequest): Observable<boolean> {
    return this.http
      .post<BaseResponseModel<object>>(`${environment.apiUrl}/auth/login`, userCred)
      .pipe(
        tap(() => this.userLoggedInSubject.next(true)), // update subject first 
        map(() => true),
        catchError((err) => {
          this.userLoggedInSubject.next(false);
          return throwError(() => err);
        })
      );
  }

  refreshToken(): Observable<boolean> {
  
    if (this.isRefreshing) {
      return this.userLoggedInSubject.asObservable().pipe(
        filter((val): val is boolean => val !== null), 
        take(1),
        map(isLoggedIn => isLoggedIn)
      );
    }
    
    this.isRefreshing = true;

    return this.http.get<BaseResponseModel<object>>(`${environment.apiUrl}/auth/refresh`)
      .pipe(
        tap(() => {
          this.userLoggedInSubject.next(true);
          this.isRefreshing = false;
        }),
        map(() => true),
        catchError(() => {
          this.userLoggedInSubject.next(false);
          this.isRefreshing = false;
          return of(false);
        })
      );
  }

  logout(): void {
    this.userLoggedInSubject.next(false);
    
  }

  googleLogin(token : IGoogleLogin): Observable<boolean> {
    return this.http.post<BaseResponseModel<string>>(
      `${environment.apiUrl}/auth/google-login`, token)
    .pipe(
      tap(() => {this.userLoggedInSubject.next(true);}),
      map(() => true),
      catchError((err) => {
        this.userLoggedInSubject.next(false);
        return throwError(() => err);
      })
    );
  }

  private validateToken(): Observable<boolean> {
    return this.http.get<BaseResponseModel<boolean>>(`${environment.apiUrl}/auth/validate-login-status`)
      .pipe(
        map(res => res.data),
        tap(isValid => this.userLoggedInSubject.next(isValid)),
        catchError((err: HttpErrorResponse) => { 
          if (err.status === 401) {
            this.userLoggedInSubject.next(false);
            return of(false);
          }
          return throwError(() => err);
        })
      );
  }

}
