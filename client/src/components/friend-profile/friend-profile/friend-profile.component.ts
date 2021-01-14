import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../utils/api/api.service';
import { User, UserContext } from '../../../app/userContext';
import { UserFriend } from '../../../app/user-friend';

@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.css'],
})
export class FriendProfileComponent implements OnInit {
  currentUserName: string;
  friendId: Number;
  isFriend: string;
  disabled: boolean;
  users: User[];
  friend: UserFriend;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userContext: UserContext
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.users = data.data.users;
      this.friendId = data.data.user.id;
      this.currentUserName =
        data.data.user.firstName + ' ' + data.data.user.lastName;

      this.friend = data.data.userFriends.find(
        (userFriend) =>
          this.friendId === userFriend.friendId ||
          this.friendId === userFriend.userId
      );
    });
  }

  sendFriendRequest(): void {
    this.disabled = true;

    this.apiService
      .sendFriendRequest(this.userContext.user.id, this.friendId)
      .subscribe((friend: UserFriend) => {
        this.friend = friend;
        this.disabled = false;
      });
  }

  cancelFriendsRequest(): void {
    this.disabled = true;
    this.apiService.deleteFriendsRequest(this.friend.id).subscribe(() => {
      this.friend = undefined;
      this.disabled = false;
    });
  }
}
