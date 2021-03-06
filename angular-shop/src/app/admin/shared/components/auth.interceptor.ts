import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 constructor(
 private authService: AuthService,
 private router: Router
 ) {}
 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 if (this.authService.isAuthenticated()) {
 req = req.clone({
 setParams: {
 auth: this.authService.token
 }
 });
 }
 return next.handle(req)
 .pipe(
 tap(() => {console.log('Intercept');}),
 catchError((error: HttpErrorResponse) => {
 console.log('[Interceptor Error]: ', error);
 if (error.status === 401) {
 this.authService.logout();
 this.router.navigate(['/admin', 'login'], {
 queryParams: {
 authFailed: true
 }
 });
 }
 return throwError(error);
 })
 );
 }
}