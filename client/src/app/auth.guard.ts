import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { UserContext } from './userContext';
import { ApiService } from '../utils/api/api.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private context: UserContext,
    private router: Router,
    private apiService: ApiService
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let authorizedUser =
      JSON.parse(localStorage.getItem('authorizedUser')) || {};
    this.context.accessToken = authorizedUser.accessToken;
    this.context.refreshToken = authorizedUser.refreshToken;

    this.context.user = await this.apiService
      .findUserById(authorizedUser.id)
      .toPromise();

    if (this.context.accessToken && this.context.user) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
