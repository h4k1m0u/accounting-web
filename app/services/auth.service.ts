import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
    token: string;

    // Signal user's login/logout to communicate between components
    // http://www.iamnotanengineer.com/2017/angular-4-what-is-a-subject-and-how-it-can-be-used-basic-example/
    logged: Subject<boolean> = new Subject<boolean>();

    constructor() { }

    login(token: string) {
        // save token on login
        this.token = token;
    }

    logout() {
        // delete token on logout
        this.token = '';
    }
}
