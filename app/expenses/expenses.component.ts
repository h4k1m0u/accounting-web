/*
 * Http request using Angular4:
 * https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL } from '../constants';

// Success and error response interfaces
interface Expense {
    date: string;
    description: string;
    amount: string;
    user: string;
}

interface ErrorMessage {
    description: string[1];
    amount: string[1];
    non_field_errors: string[1];
}

interface ErrorResponse {
    error: ErrorMessage;
}

@Component({
    selector: 'app-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
    expenses: Expense[];
    descriptionError: string;
    amountError: string;
    generalError: string;
    display: string = 'none';

    // inject http
    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit() {
        this.getExpenses()
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
                this.getExpenses()
            },
            (err: ErrorResponse) => {
                let error = err.error;
                this.descriptionError = '';
                this.amountError = '';
                this.generalError = '';

                // set error messages
                if (error.hasOwnProperty('description'))
                    this.descriptionError = 'Description: ' + error.description[0];
                if (error.hasOwnProperty('amount'))
                    this.amountError = 'Amount: ' + error.amount[0];
                if (error.hasOwnProperty('non_field_errors'))
                    this.generalError = 'General error: ' + error.non_field_errors[0];
            }
        );
    }

    getExpenses() {
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

    setDisplay() {
        // show/hide the add expense form
        this.display = (this.display == 'none' ? 'block' : 'none');
    }
}
