import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Accounting';
    isLogged: boolean;
    
    // inject auth
    constructor(private auth: AuthService) { }

    ngOnInit() {
        this.isLogged = this.auth.isLogged();
    }
}
