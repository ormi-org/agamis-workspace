import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiCallInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<never>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (req.url.startsWith('/api')) {
      return next.handle(
        req.clone({
          url: req.url.replace('/api', environment.apiBaseUrl + '/api'),
        })
      );
    }
    return next.handle(req);
  }
}
