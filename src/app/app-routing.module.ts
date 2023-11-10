import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SigninUserComponent } from './components/signin.user/signin.user';
import { InsertUser } from './components/insert.user/insert.user';
import { UpdateUser } from './components/update.user/update.user';
import { Home } from './components/home/home';





const routes: Routes = [
  {path:"", component:Home },
  {path:"showSignin", component:SigninUserComponent },
  {path:"showInsertUser", component:InsertUser },
  {path:"showUpdateUser", component:UpdateUser }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {


}
