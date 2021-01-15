import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  friendsOfFriend: User[];
  friendsOfUser: User[];
  showFriends: boolean = true;
  mutualFriends: User[];
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userContext: UserContext,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.users = data.data.users;
      this.friendId = data.data.user.id;
      this.currentUserName =
        data.data.user.firstName + ' ' + data.data.user.lastName;

      // friend who's page logged in user is currently on
      this.friend = data.data.userFriends.find(
        (userFriend) =>
          this.friendId === userFriend.friendId ||
          this.friendId === userFriend.userId
      );

      // =========================================================================== //
      let confirmedRequestsOfFriend = data.data.friendsOfFriend.filter(
        (userFriend) => !userFriend.isPending
      );

      this.friendsOfFriend = this.users.filter(
        (user) =>
          user.id !== this.friendId &&
          confirmedRequestsOfFriend.some(
            (userFriend) =>
              userFriend.userId === user.id || userFriend.friendId === user.id
          )
      );

      // ============================================================================//

      let confirmedRequestsOfUser = data.data.userFriends.filter(
        (userFriend) => !userFriend.isPending
      );
      this.friendsOfUser = this.users.filter(
        (user) =>
          user.id !== this.userContext.user.id &&
          confirmedRequestsOfUser.some(
            (userFriend) =>
              userFriend.userId === user.id || userFriend.friendId === user.id
          )
      );

      // =========================================================================== //

      this.mutualFriends = this.friendsOfUser.filter((user) =>
        this.friendsOfFriend.some((friend) => friend.id === user.id)
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

  cancelFriendsRequestOrUnfriend(): void {
    this.disabled = true;
    this.apiService.deleteFriendsRequest(this.friend.id).subscribe(() => {
      this.friend = undefined;
      this.disabled = false;
    });
  }

  navigateToUsersPage(id): void {
    this.router.navigate(['friend-profile/', id]);
  }

  showFriendsOrMutualFriends(bool: boolean): void {
    this.showFriends = bool;
  }
}
