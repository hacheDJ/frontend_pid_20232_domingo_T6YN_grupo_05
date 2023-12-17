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
import { InsertRequestLoan } from './components/insert.request.loan/insert.requestLoan';
import { MatDialogModule } from '@angular/material/dialog';
import { InsertBankAccount } from './components/insert.bank.account/insert.bank.account';
import { ReadRequestLoan } from './components/read.request.loan/read.request.loan';
import { UpdateRequestLoan } from './components/update.request.loan/update.request.loan';
import { ReadLoan } from './components/read.loan/read.loan';
import { ReadPay } from './components/read.pay/read.pay';
import { InsertPay } from './components/insert.pay/insert.pay';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailPay } from './components/detail.pay/detail.pay';
import { LoanGroup } from './components/loan.group/loan.group';
import { AdminLoanGroup } from './components/admin.loan.group/admin.loan.group';
import { PdfComponent } from './pdf/pdf.component';

@NgModule({
  declarations: [
    AppComponent,
    Home,
    SigninUserComponent,
    UpdateUser,
    InsertUser,
    InsertRequestLoan,
    InsertBankAccount,
    ReadRequestLoan,
    UpdateRequestLoan,
    ReadLoan,
    ReadPay,
    InsertPay,
    DetailPay,
    LoanGroup,
    AdminLoanGroup,
    PdfComponent
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
    NgxPaginationModule
    
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
