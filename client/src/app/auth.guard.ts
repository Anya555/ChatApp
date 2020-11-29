import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
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
    this.context.user = await this.apiService
      .findUserById(route.params.id)
      .toPromise();

    let tokens = JSON.parse(localStorage.getItem('tokens')) || {};
    this.context.accessToken = tokens.accessToken;
    this.context.refreshToken = tokens.refreshToken;

    if (this.context.accessToken && this.context.user) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
