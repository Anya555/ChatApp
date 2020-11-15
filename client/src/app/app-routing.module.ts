import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignUpComponent} from '../components/sign-up/sign-up/sign-up.component';
import {LoginComponent} from '../components/login/login/login.component';
const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
