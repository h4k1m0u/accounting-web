/*
 * Http request using Angular4:
 * https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface TokenResponse {
    auth_token: string;
}

@Component({
    selector: 'app-total',
    templateUrl: './total.component.html',
    styleUrls: ['./total.component.css']
})
export class TotalComponent implements OnInit {
    // inject http into component
    constructor(private http: HttpClient) { }

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
                // save token locally
                localStorage.setItem('token', res.auth_token);

                // get total from the server
                this.http.get('http://accounting.loc/api/total/').subscribe(
                    res => {
                        console.log('Res: ' + res);
                    },
                    err => {
                        console.log('Error: ' + err.message);
                    }
                );
            },
            err => {
                console.log('Error: ' + err.message);
            }
        );
    }
}
