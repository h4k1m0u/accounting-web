/*
 * Http request using Angular4:
 * https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { URL } from '../constants';

// Success and error response interfaces
interface User {
    id: number;
    email: string;
    username: string;
}

interface TokenResponse {
    auth_token: string;
}

interface ErrorMessage {
    username: string[1];
    password: string[1];
    email: string[1];
    non_field_errors: string[1];
}

interface ErrorResponse {
    error: ErrorMessage;
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    usernameError: string;
    passwordError: string;
    emailError: string;
    generalError: string;

    // inject http and auth
    constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

    ngOnInit() { }

    onRegister(username: string, password: string, email: string) {
        // triggered when register button is clicked
        const body = {
            username: username,
            password: password,
            email: email
        };

        // get created user from the server
        this.http.post<User>(URL + '/api/auth/register/', body).subscribe(
            (res: User) => {
                // login the newly-created user & get token from the server
                this.http.post<TokenResponse>(URL + '/api/auth/login/', body).subscribe(
                    (res: TokenResponse) => {
                        // login with token
                        this.auth.login(res.auth_token);

                        // send isLogged=true to app component
                        this.auth.logged.next(true);

                        // redirect to /expenses
                        this.router.navigateByUrl('/expenses');
                    },
                    err => {
                        console.log('Error: ' + err.message);
                    }
                );
            },
            (err: ErrorResponse) => {
                let error = err.error;
                this.usernameError = '';
                this.passwordError = '';
                this.emailError = '';
                this.generalError = '';

                // set error messages
                if (error.hasOwnProperty('username'))
                    this.usernameError = 'Username: ' + error.username[0];
                if (error.hasOwnProperty('password'))
                    this.passwordError = 'Password: ' + error.password[0];
                if (error.hasOwnProperty('email'))
                    this.emailError = 'Email: ' + error.email[0];
                if (error.hasOwnProperty('non_field_errors'))
                    this.generalError = 'General error: ' + error.non_field_errors[0];
            }
        );
    }
}
