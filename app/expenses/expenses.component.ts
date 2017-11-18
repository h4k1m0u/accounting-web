/*
 * Http request using Angular4:
 * https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../constants';
import { AddService } from '../services/add.service';
import { MatTableDataSource } from '@angular/material';

// Success and error response interfaces
interface Expense {
    date: string;
    description: string;
    amount: string;
    user: string;
}

interface Feed {
    count: number;
    next: string;
    previous: string;
    results: Expense[];
}

@Component({
    selector: 'app-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
    expenses: MatTableDataSource<Expense>;
    displayedColumns = ['date', 'description', 'amount'];

    // inject http
    constructor(private http: HttpClient, private add: AddService) { }

    ngOnInit() {
        this.getExpenses()

        // receive boolean from add component to update expenses
        this.add.added.subscribe((isAdded) => {
            this.getExpenses();
        });
    }

    getExpenses() {
        // get expenses from the server
        this.http.get<Feed>(URL + '/api/expenses/').subscribe(
            res => {
                let results: Expense[] = res.results;
                this.expenses = new MatTableDataSource<Expense>(results);
            },
            err => {
                console.log('Error: ' + err.message);
            }
        );
    }
}
