import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { ApiService } from '../../../src/utils/api/api.service';
import { UserContext, User } from '../../app/userContext';
import { UserFriend } from '../../app/user-friend';
import { Message } from '../../app/message';
import { AngularFireStorage } from '@angular/fire/storage';

interface ResolveData {
  users: User[];
  userFriends: UserFriend[];
  userChats: Message[];
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<ResolveData> {
  constructor(
    private apiService: ApiService,
    private userContext: UserContext,
    private firebaseStorage: AngularFireStorage
  ) {}
  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<ResolveData> {
    let users: User[];
    let userFriends: UserFriend[];
    let userChats: Message[];

    users = await this.apiService.findAllUsers().toPromise();
    userFriends = await this.apiService
      .findUserFriendsById(this.userContext.user.id)
      .toPromise();
    userChats = await this.apiService
      .findAllUserChats(this.userContext.user.id)
      .toPromise();

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

    let data: ResolveData = {
      users: users,
      userFriends: userFriends,
      userChats: userChats,
    };

    if (this.userContext.user.hasAvatarImage) {
      data.imageUrl = await this.firebaseStorage
        .ref('image' + this.userContext.user.id)
        .getDownloadURL()
        .toPromise();
    }
    return data;
  }
}
