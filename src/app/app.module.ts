import { ApplicationModule, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SigninUserComponent } from './components/signin.user/signin.user';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateLenderBoss } from './components/update.lenderboss/update.lenderboss';
import { InsertLenderBoss } from './components/insert.lenderboss/insert.lenderboss';
import { AppMaterialModule } from './app.material.module';
import { Home } from './components/home/home';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    Home,
    SigninUserComponent,
    UpdateLenderBoss,
    InsertLenderBoss
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    ApplicationModule,
    CommonModule,
    AppMaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
