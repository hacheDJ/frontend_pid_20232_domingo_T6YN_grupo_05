import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SigninUserComponent } from './components/signin.user/signin.user';
import { InsertLenderBoss } from './components/insert.lenderboss/insert.lenderboss';
import { UpdateLenderBoss } from './components/update.lenderboss/update.lenderboss';
import { Home } from './components/home/home';





const routes: Routes = [
  {path:"", component:Home },
  {path:"showSignin", component:SigninUserComponent },
  {path:"showInsertLenderBoss", component:InsertLenderBoss },
  {path:"showUpdateLenderBoss", component:UpdateLenderBoss }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {


}
