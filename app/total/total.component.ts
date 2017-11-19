/*
 * Http request using Angular4:
 * https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../constants';
import { AddService } from '../services/add.service';

@Component({
    selector: 'app-total',
    templateUrl: './total.component.html',
    styleUrls: ['./total.component.css']
})
export class TotalComponent implements OnInit {
    total: number;

    // inject http
    constructor(private http: HttpClient, private add: AddService) { }

    ngOnInit() {
        this.getTotal()

        // receive boolean from add component to update total
        this.add.added.subscribe((isAdded) => {
            this.getTotal();
        });
    }

    getTotal() {
        // get total from the server
        this.http.get<number>(URL + '/api/expenses/total/').subscribe(
            res => {
                this.total = res;
            },
            err => {
                console.log('Error: ' + err.message);
            }
        );
    }
}
