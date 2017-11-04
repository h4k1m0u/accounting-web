/*
 * Http request using Angular4:
 * https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL } from '../constants';

interface Expense {
    date: string;
    description: string;
    amount: string;
    user: string;
}

@Component({
    selector: 'app-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
    expenses: Expense[];

    // inject http
    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit() {
        this.get_expenses()
    }

    onAdd(description: string, amount: number) {
        // triggered when add expense button is clicked
        const body = {
            description: description,
            amount: amount
        };

        this.http.post<string>(URL + '/api/expenses/', body).subscribe(
            res => {
                // reload expenses
                this.get_expenses()
            },
            err => {
                console.log('Error: ' + err.message);

                // TODO: Add error messages here like in /login
            }
        );
    }

    get_expenses() {
        // get expenses from the server
        this.http.get<Expense[]>(URL + '/api/expenses/').subscribe(
            res => {
                this.expenses = res;
            },
            err => {
                console.log('Error: ' + err.message);
            }
        );
    }
}
