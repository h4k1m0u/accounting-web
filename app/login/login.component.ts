/*
 * Http request using Angular4:
 * https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

interface TokenResponse {
    auth_token: string;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    // inject http and auth
    constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

    ngOnInit() { }

    onLogin(username: string, password: string) {
        // triggered when login button is clicked
        const body = {
            username: username,
            password: password
        };

        // get token from the server
        this.http.post<TokenResponse>('http://accounting.loc/api/auth/login/', body).subscribe(
            res => {
                // login with token
                this.auth.login(res.auth_token);

                // send isLogged=true to app component
                this.auth.logged.next(true);

                // redirect to /total
                this.router.navigateByUrl('/total');
            },
            err => {
                console.log('Error: ' + err.message);
            }
        );
    }
}
