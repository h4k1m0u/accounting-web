/*
 * Http request using Angular4:
 * https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../constants';

interface User {
    id: number;
    email: string;
    username: string;
}

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    username: string;

    // inject http
    constructor(private http: HttpClient) { }

    ngOnInit() {
        // get user from the server
        this.http.get<User>(URL + '/api/auth/me/').subscribe(
            (res: User) => {
                this.username = res.username;
            },
            err => {
                console.log('Error: ' + err.message);
            }
        );
    }
}
