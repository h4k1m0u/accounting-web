// Add token to request header
// https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';


@Injectable()
export class LoginInterceptor implements HttpInterceptor {
    // inject auth
    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // get token
        const token = this.auth.token;

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
