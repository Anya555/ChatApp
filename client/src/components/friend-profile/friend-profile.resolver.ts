import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { ApiService } from '../../utils/api/api.service';
import { UserContext } from '../../app/userContext';

@Injectable({
  providedIn: 'root',
})
export class FriendProfileResolver implements Resolve<boolean> {
  constructor(
    private apiService: ApiService,
    private userContext: UserContext
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return forkJoin({
      user: this.apiService.findUserById(route.params.id),
      userFriends: this.apiService.findUserFriendsById(
        this.userContext.user.id
      ),
      users: this.apiService.findAllUsers(),
    });
  }
}
