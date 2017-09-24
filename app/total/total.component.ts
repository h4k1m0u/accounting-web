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
    token: string;

    // inject http into component
    constructor(private http: HttpClient) { }

    ngOnInit() {
        // get token from the server
        let body = {
            username: 'hakim',
            password: 'L57f841C'
        };

        this.http.post<TokenResponse>('http://accounting.loc/api/auth/login/', body).subscribe(
            res => {
                console.log(res.auth_token);
            },
            err => {
                console.log(err);
            }
        );
    }

}
