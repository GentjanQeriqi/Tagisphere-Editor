import { Injectable } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';


@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('/login') || request.url.includes('/registration')) {
      return next.handle(request);
    }

    const authRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this.authService.getAccessToken()}`)

    });

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403  && this.authService.getRefreshToken()) {
          return this.authService.getRefreshToken().pipe(
            switchMap(() => {
              const authRequest = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${this.authService.getAccessToken()}`)
              });

              return next.handle(authRequest);
            }),
            // catchError(() => {
            //   // handle error refreshing token
            // })
          );
        }

        return throwError(error);
      })
    );
  }
}