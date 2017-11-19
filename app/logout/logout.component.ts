import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
    // inject auth
    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit() {
        // logout
        this.auth.logout();

        // send isLogged=false to app component
        this.auth.logged.next(false);

        // redirect to /login
        this.router.navigateByUrl('/expenses/login');
    }
}
