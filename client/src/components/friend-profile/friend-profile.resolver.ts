import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../utils/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class FriendProfileResolver implements Resolve<boolean> {
  constructor(private apiService: ApiService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.apiService.findUserById(route.params.id);
  }
}
