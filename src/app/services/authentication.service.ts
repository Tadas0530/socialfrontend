import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../common/post';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {
    
  }

  posts: Post[] = null!;
  
  currentUser: User = JSON.parse(sessionStorage.getItem('currentUser')!);


  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticaterUser');
    return !(user === null);
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem('authenticaterUser');
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem('token');
    }
    return null;
  }

  logout() {
    sessionStorage.removeItem('authenticaterUser');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('currentUser')
  }

  executeJWTAuthenticationService(username: string, password: string) {
    return this.httpClient
      .post<any>(`http://localhost:8080/authenticate`, { username, password })
      .pipe(
        map((data) => {
          sessionStorage.setItem('authenticaterUser', username);
          sessionStorage.setItem('token', `Bearer ${data.token}`);
          return data;
        })
      );
  }

  registerUser(username: string, password: string): Observable<any> {
    let isActive: boolean = true;
    let role: string = 'ROLES_USER';
    return this.httpClient
      .post<any>('http://localhost:8080/api/signup', {
        isActive,
        username,
        password,
        role,
      })
      .pipe(
        map((data) =>
          console.log('Sending new user: ' + isActive, username, password, role)
        )
      );
  }

  retrieveLoggedInUser(): Observable<User> {
    return this.httpClient.get<User>('http://localhost:8080/currentUser');
  }

  userInit() {
    this.retrieveLoggedInUser().subscribe((data) => {
      sessionStorage.setItem('currentUser', JSON.stringify(data));
    });
  }
}

export class AuthenticationBean {
  constructor(public message: string) {}
}