import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddComponent } from './add/add.component';
import { MatSnackBar } from '@angular/material';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    appName = 'Expenses';
    isLogged: boolean = false;
    
    // inject auth
    constructor(private auth: AuthService, private router: Router, private cdRef:ChangeDetectorRef,
                private dialog: MatDialog, private snackBar: MatSnackBar,
                private googleAnalytics: Angulartics2GoogleAnalytics) { }

    ngOnInit() {
        // receive boolean from login/logout components to update menu
        this.auth.logged.subscribe((isLogged) => {
            // run change detection to avoid ExpressionChangedAfterItHasBeenCheckedError
            this.isLogged = isLogged;
            this.cdRef.detectChanges();
        });

        // redirect according to whether user logged in
        if (this.isLogged)
            this.router.navigateByUrl('/accounting/expenses');
        else
            this.router.navigateByUrl('/accounting/login');
    }

    openDialog() {
        // Open dialog to add new expense
        let dialogRef = this.dialog.open(AddComponent);

        // show snackbar on success
        dialogRef.afterClosed().subscribe(res => {
            if (res)
                this.snackBar.open('Expense "' + res + '" was added', 'Success', {duration: 2000});
        });
    }
}
