import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TotalComponent } from './total/total.component';
import { AuthComponent } from './auth/auth.component';

// import ngModel
import { FormsModule } from '@angular/forms';

// import http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// import custom http interceptor
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthService } from './services/auth.service';

// import router
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path: 'auth', component: AuthComponent},
    {path: 'total', component: TotalComponent}
];


@NgModule({
    declarations: [
        AppComponent,
        TotalComponent,
        AuthComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes)
    ],
    // Import auth interceptor and service
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
