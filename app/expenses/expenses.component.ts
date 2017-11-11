/*
 * Http request using Angular4:
 * https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL } from '../constants';
import { AddComponent } from '../add/add.component';
import { AddService } from '../services/add.service';
import { MatTableDataSource } from '@angular/material';

// Success and error response interfaces
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
    expenses: MatTableDataSource<Expense>;
    displayedColumns = ['date', 'description', 'amount'];

    // inject http
    constructor(private http: HttpClient, private router: Router, private add: AddService) { }

    ngOnInit() {
        this.getExpenses()

        // receive boolean from add component to update expenses
        this.add.added.subscribe((isAdded) => {
            this.getExpenses();
        });
    }

    getExpenses() {
        // get expenses from the server
        this.http.get<Expense[]>(URL + '/api/expenses/').subscribe(
            res => {
                //this.expenses = res;
                this.expenses = new MatTableDataSource<Expense>(res);
            },
            err => {
                console.log('Error: ' + err.message);
            }
        );
    }
}
