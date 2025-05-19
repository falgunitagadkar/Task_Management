import { Injectable } from '@angular/core';
import { ILogin, IUser } from '../models/login';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userLoggedIn: boolean = this.checkUserLoggedIn();
  private userLoggedInSubject = new BehaviorSubject<boolean>(this.userLoggedIn);
  private apiUrl = 'http://localhost:3000';
  users!: IUser[];

  constructor(private http: HttpClient) {
    this.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  get userLoggedIn$() {
    return this.userLoggedInSubject.asObservable();
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl + '/users');
  }

  login(userCred: ILogin): boolean {
    const user = this.users.find(
      (x) => x.email == userCred.email && x.password == userCred.password
    );

    if (user != null) localStorage.setItem('currentUserId', user.id.toString());

    this.userLoggedIn = this.checkUserLoggedIn();
    this.userLoggedInSubject.next(this.userLoggedIn);
    return !!user;
  }

  checkUserLoggedIn() {
    const user = localStorage.getItem('currentUserId');
    return !!user;
  }

  logout() {
    localStorage.removeItem('currentUserId');
    this.userLoggedIn = this.checkUserLoggedIn(); // Update the variable
    this.userLoggedInSubject.next(this.userLoggedIn);
  }
}
