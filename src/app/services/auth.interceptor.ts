import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ApiService } from './api.service'; // Adjust the path as necessary
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private apiService: ApiService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expired, try to refresh it
          return this.handle401Error(req, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      return this.apiService.refreshToken({ refreshToken }).pipe(
        switchMap((data: any) => {
          localStorage.setItem('access_token', data.accessToken);

          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${data.accessToken}`
            }
          });

          return next.handle(req);
        }),
        catchError((err) => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          this.router.navigate(['/login']); // Navigate to login if refreshing token fails
          return throwError(err);
        })
      );
    } else {
      // No refresh token available, redirect to login
      this.router.navigate(['/login']);
      return throwError('No refresh token available');
    }
  }
}
