import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@nestjs/common';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

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
