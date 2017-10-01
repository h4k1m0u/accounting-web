/*
 * Http request using Angular4:
 * https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

interface TokenResponse {
    auth_token: string;
}

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    // inject http and auth
    constructor(private http: HttpClient, private auth: AuthService) { }

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

                // reload page
            },
            err => {
                console.log('Error: ' + err.message);
            }
        );
    }
}
