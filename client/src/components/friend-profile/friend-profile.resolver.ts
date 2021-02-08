import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { ApiService } from '../../utils/api/api.service';
import { UserContext, User } from '../../app/userContext';
import { UserFriend } from '../../app/user-friend';
import { AngularFireStorage } from '@angular/fire/storage';

interface ResolveData {
  user: User;
  userFriends: UserFriend[];
  users: User[];
  friendsOfFriend: UserFriend[];
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FriendProfileResolver implements Resolve<ResolveData> {
  constructor(
    private apiService: ApiService,
    private userContext: UserContext,
    private firebaseStorage: AngularFireStorage
  ) {}
  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<ResolveData> {
    let user: User;
    let userFriends: UserFriend[];
    let users: User[];
    let friendsOfFriend: UserFriend[];

    user = await this.apiService.findUserById(route.params.id).toPromise();
    userFriends = await this.apiService
      .findUserFriendsById(this.userContext.user.id)
      .toPromise();
    users = await this.apiService.findAllUsers().toPromise();
    friendsOfFriend = await this.apiService
      .findUserFriendsById(route.params.id)
      .toPromise();

    let data: ResolveData = {
      user: user,
      userFriends: userFriends,
      users: users,
      friendsOfFriend: friendsOfFriend,
    };

    Promise.all(
      users.map((user: User) => {
        if (user.hasAvatarImage) {
          this.firebaseStorage
            .ref('image' + user.id)
            .getDownloadURL()
            .subscribe((url) => {
              user.imageUrl = url;
            });
        }
      })
    );
    if (user.hasAvatarImage) {
      data.imageUrl = await this.firebaseStorage
        .ref('image' + route.params.id)
        .getDownloadURL()
        .toPromise();
    }

    return data;
  }
}
