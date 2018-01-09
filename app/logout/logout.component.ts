import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { URL } from '../constants';

// Error response interface
interface ErrorResponse {
    error: ErrorMessage;
}

interface ErrorMessage {
    detail: string;
}

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
    // inject auth
    constructor(private auth: AuthService, private router: Router, private http: HttpClient,
                private snackBar: MatSnackBar) { }

    ngOnInit() {
        // remove token on the server
        this.http.post<string>(URL + '/api/auth/token/destroy/', {}).subscribe(
            (res: string) => {
                // logout
                this.auth.logout();

                // send isLogged=false to app component
                this.auth.logged.next(false);

                // redirect to /login
                this.router.navigateByUrl('/accounting/login');
            },
            (err: ErrorResponse) => {
                let error = err.error;

                // show error messages in snackbar
                this.snackBar.open('Detail: ' + error.detail, 'Error', {duration: 2000});
            }
        );
    }
}
