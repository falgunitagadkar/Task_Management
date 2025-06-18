import { Injectable } from '@angular/core';
import { ILoginRequest } from '../components/login/models/login';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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
    this.http.post<BaseResponseModel<string>>(`${environment.apiUrl}/auth/login`,userCred)
    .subscribe({
      next : (res) => {
        this.userLoggedIn = true;
        //In-memory storage, changes with new tab
        this.tokenService.setToken(res.data);
        this.userLoggedInSubject.next(this.userLoggedIn);
      },
      error : () => {
        this.userLoggedIn = false;
      }
    })
    return this.userLoggedIn$;
  }

  checkUserLoggedIn() {
     return this.userLoggedIn;
  }

  logout() {
    this.tokenService.clearToken();
    this.userLoggedIn = false; // Update the variable
    this.userLoggedInSubject.next(this.userLoggedIn);
  }
}
