import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TotalComponent } from './total/total.component';

// import ngModel
import { FormsModule } from '@angular/forms';

// import http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './total/auth.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        TotalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
    // Add token header to all http requests using interceptor
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
