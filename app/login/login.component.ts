/*
 * Http request using Angular4:
 * https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

// Success and error response interfaces
interface TokenResponse {
    auth_token: string;
}

interface ErrorMessage {
    username: string[1];
    password: string[1];
    non_field_errors: string[1];
}

interface ErrorResponse {
    error: ErrorMessage;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    usernameError: string;
    passwordError: string;
    generalError: string;

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
            (res: TokenResponse) => {
                // login with token
                this.auth.login(res.auth_token);

                // send isLogged=true to app component
                this.auth.logged.next(true);

                // redirect to /total
                this.router.navigateByUrl('/total');
            },
            (err: ErrorResponse) => {
                let error = err.error;
                this.usernameError = '';
                this.passwordError = '';
                this.generalError = '';

                // set error messages
                if (error.hasOwnProperty('username'))
                    this.usernameError = 'Username: ' + error.username[0];
                if (error.hasOwnProperty('password'))
                    this.passwordError = 'Password: ' + error.password[0];
                if (error.hasOwnProperty('non_field_errors'))
                    this.generalError = 'General error: ' + error.non_field_errors[0];
            }
        );
    }
}
