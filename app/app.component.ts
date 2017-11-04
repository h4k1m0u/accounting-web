import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    appName = 'Accounting';
    isLogged: boolean = false;
    
    // inject auth
    constructor(private auth: AuthService, private router: Router, private cdRef:ChangeDetectorRef) { }

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
}
