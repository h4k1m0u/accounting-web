import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    constructor() { }

    login(token: string) {
        // save token on login
        localStorage.setItem('token', token);
    }

    isLogged(): boolean {
        // check if saved token
        const token = localStorage.getItem('token');
        return token ? true : false;
    }

    getToken(): string {
        return localStorage.getItem('token');
    }
}
