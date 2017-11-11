import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AddService {
    token: string;

    // Signal expense added to communicate between components
    // http://www.iamnotanengineer.com/2017/angular-4-what-is-a-subject-and-how-it-can-be-used-basic-example/
    added: Subject<boolean> = new Subject<boolean>();

    constructor() { }
}
