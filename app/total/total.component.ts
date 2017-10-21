/*
 * Http request using Angular4:
 * https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../constants';

@Component({
    selector: 'app-total',
    templateUrl: './total.component.html',
    styleUrls: ['./total.component.css']
})
export class TotalComponent implements OnInit {
    total: number;

    // inject http
    constructor(private http: HttpClient) { }

    ngOnInit() {
        // get total from the server
        this.http.get<number>(URL + '/api/total/').subscribe(
            res => {
                this.total = res;
            },
            err => {
                console.log('Error: ' + err.message);
            }
        );
    }
}
