import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddComponent } from './add/add.component';
import { MatSnackBar } from '@angular/material';

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
                private dialog: MatDialog, private snackBar: MatSnackBar) { }

    ngOnInit() {
        // receive boolean from login/logout components to update menu
        this.auth.logged.subscribe((isLogged) => {
            // run change detection to avoid ExpressionChangedAfterItHasBeenCheckedError
            this.isLogged = isLogged;
            this.cdRef.detectChanges();
        });

        // redirect according to whether user logged in
        if (this.isLogged)
            this.router.navigateByUrl('/expenses');
        else
            this.router.navigateByUrl('/login');
    }

    openDialog() {
        // Open dialog to add new expense
        let dialogRef = this.dialog.open(AddComponent);

        // show snackbar on success
        dialogRef.afterClosed().subscribe(res => {
            this.snackBar.open('Expense "' + res + '" was added', 'Success', {duration: 2000});
        });
    }
}
