import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { FBAuthResponse, FbCreateresponse, User, UserAddInfo } from 'src/app/shared/interfaces';

@Injectable({providedIn: 'root'})
export class AuthService {
 constructor(private http: HttpClient) {}
 public error$: Subject<string> = new Subject<string>();
 get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
    this.logout();
    return null;
    }
    return localStorage.getItem('fb-token');
 }

 register(user: User): Observable<any>{
   user.returnSecureToken = true;
   return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
    ${environment.apiKey}`, user).pipe(
    tap(this.setToken),
    catchError(this.handleError.bind(this))
    );
 }

 registerUser(user: UserAddInfo): Observable<UserAddInfo> {
   return this.http.put(`${environment.fbDbUrl}/users/${user.name}.json`, user)
   .pipe(map((response: FbCreateresponse) => {
   return {
   ...user,
   id: user.name
   };
   }));
  }

  loginUser(name: string): Observable<UserAddInfo> {
   return this.http.get<UserAddInfo>(`${environment.fbDbUrl}/users/${name}.json`)
   .pipe(map((user: UserAddInfo) => {
   return {
   ...user
   };
   }));
}

 login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
    ${environment.apiKey}`, user).pipe(
    tap(this.setToken),
    catchError(this.handleError.bind(this))
    );
    
    }
   private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;
    switch (message) {
    case 'INVALID_EMAIL':
    this.error$.next('Неправильний email');
    break;
    case 'INVALID_PASSWORD':
    this.error$.next('Неправильний пароль');
    break;
    case 'EMAIL_NOT_FOUND':
    this.error$.next('Користувача з таким email немає');
    break;
    }
    return throwError(error);
   }  
   logout() {
    this.setToken(null);
   }   
 isAuthenticated(): boolean {
    return !!this.token;
 }
 private setToken(response: FBAuthResponse | null) {
    if (response) {
    const expiresDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
    localStorage.setItem('fb-token', response.idToken);
    localStorage.setItem('fb-token-exp', expiresDate.toString());
    } else{
    localStorage.clear();
    }
 }   
}
