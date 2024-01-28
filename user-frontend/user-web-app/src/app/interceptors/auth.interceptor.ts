import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {
  Observable,
  catchError,
  map,
  mergeMap,
  of,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authService.isAuthenticated$.pipe(
      take(1),
      mergeMap((isAuthenticated) => {
        if (isAuthenticated) {
          return this.authService.getToken().pipe(
            take(1),
            map((token) => {
              if (token) {
                request = request.clone({
                  headers: request.headers.set(
                    'Authorization',
                    `Bearer ${token}`
                  ),
                });
              }
              return request;
            })
          );
        } else {
          return of(request);
        }
      }),
      mergeMap((request) => next.handle(request))
    );
  }
}
