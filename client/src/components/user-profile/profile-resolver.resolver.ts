import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { ApiService } from '../../../src/utils/api/api.service';
import { UserContext } from '../../app/userContext';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<boolean> {
  constructor(
    private apiService: ApiService,
    private userContext: UserContext
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return forkJoin({
      users: this.apiService.findAllUsers(),
      userFriends: this.apiService.findUserFriendsById(
        this.userContext.user.id
      ),
      userChats: this.apiService.findAllUserChats(this.userContext.user.id),
    });
  }
}
