import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getIdToken } from './app.module';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const token = getIdToken();
        if (token) {
            const cloned = request.clone({
                headers: request.headers.append(
                    'Authorization',
                    'Bearer ' + token
                )
            });
            return next.handle(cloned);
        } else {
            return next.handle(request);
        }
    }
}
