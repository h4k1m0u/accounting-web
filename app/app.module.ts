import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TotalComponent } from './total/total.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

// import ngModel
import { FormsModule } from '@angular/forms';

// import http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// import custom http interceptor
import { LoginInterceptor } from './login/login.interceptor';
import { AuthService } from './services/auth.service';

// import router
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'total', component: TotalComponent},
    {path: 'logout', component: LogoutComponent}
];


@NgModule({
    declarations: [
        AppComponent,
        TotalComponent,
        LoginComponent,
        LogoutComponent,
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
            useClass: LoginInterceptor,
            multi: true
        },
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
