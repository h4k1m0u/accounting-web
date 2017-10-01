// Add token to request header
// https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');

        // add token (if it exists) to request header
        if (token) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', 'token ' + token)
            });
            return next.handle(authReq);
        } else
            return next.handle(req);
    }
}
