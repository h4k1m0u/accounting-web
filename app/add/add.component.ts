import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL } from '../constants';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { AddService } from '../services/add.service';

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
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddComponent implements OnInit {

    constructor(private http: HttpClient, private router: Router, private dialogRef: MatDialogRef<AddComponent>,
                private snackBar: MatSnackBar, private add: AddService) { }

    ngOnInit() {
    }

    onAdd(description: string, amount: number) {
        // triggered when add expense button is clicked
        const body = {
            description: description,
            amount: amount
        };

        this.http.post<Expense>(URL + '/api/expenses/', body).subscribe(
            res => {
                // close dialog
                this.dialogRef.close(res.description);

                // send isAdded=true to expenses component
                this.add.added.next(true);
            },
            (err: ErrorResponse) => {
                let error = err.error;

                // show error messages in snackbar
                if (error.hasOwnProperty('description') && error.hasOwnProperty('amount'))
                    this.snackBar.open('Description: ' + error.description[0] + ' Amount: ' + error.amount[0], 'Error', {duration: 2000});
                else {
                    if (error.hasOwnProperty('description'))
                        this.snackBar.open('Description: ' + error.description[0], 'Error', {duration: 2000});
                    if (error.hasOwnProperty('amount'))
                        this.snackBar.open('Amount: ' + error.amount[0], 'Error', {duration: 2000});
                    if (error.hasOwnProperty('non_field_errors'))
                        this.snackBar.open('Credentials: ' + error.non_field_errors[0], 'Error', {duration: 2000});
                }
            }
        );
    }
}
