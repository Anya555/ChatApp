import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from '../components/sign-up/sign-up/sign-up.component';
import { LoginComponent } from '../components/login/login/login.component';
import { UserProfileComponent } from '../components/user-profile/user-profile/user-profile.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user-profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
