import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatMenuModule, MatButtonModule, MatIconModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

// import components
import { AppComponent } from './app.component';
import { TotalComponent } from './total/total.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AddComponent } from './add/add.component';

// import ngModel
import { FormsModule } from '@angular/forms';
// import http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// import custom http interceptor
import { LoginInterceptor } from './login/login.interceptor';
import { AuthService } from './services/auth.service';
import { AddService } from './services/add.service';

// import router
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'expenses', component: ExpensesComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'add', component: AddComponent}
];


@NgModule({
    declarations: [
        AppComponent,
        TotalComponent,
        ExpensesComponent,
        LoginComponent,
        LogoutComponent,
        RegisterComponent,
        UserComponent,
        AddComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),

        // material
        BrowserAnimationsModule,
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatTableModule,
        MatDialogModule,
        MatCardModule,
        MatChipsModule
    ],
    // Import auth interceptor and services
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoginInterceptor,
            multi: true
        },
        AuthService,
        AddService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
