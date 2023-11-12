import { ApplicationModule, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SigninUserComponent } from './components/signin.user/signin.user';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateUser } from './components/update.user/update.user';
import { InsertUser } from './components/insert.user/insert.user';
import { Home } from './components/home/home';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/security/AuthInterceptor';
import { InserRequestLoan } from './components/insert.request.loan/insert.requestLoan';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InsertBankAccount } from './components/insert.bank.account/insert.bank.account';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent,
    Home,
    SigninUserComponent,
    UpdateUser,
    InsertUser,
    InserRequestLoan,
    InsertBankAccount
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    ApplicationModule,
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
