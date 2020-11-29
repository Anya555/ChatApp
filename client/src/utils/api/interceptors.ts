import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserContext } from '../../app/userContext';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private context: UserContext) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      headers: req.headers.set(
        'x-access-token',
        this.context.accessToken || ''
      ),
    });

    return next.handle(modifiedReq);
  }
}
