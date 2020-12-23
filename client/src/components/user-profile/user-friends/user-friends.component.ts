import { Component, OnInit, Input } from '@angular/core';
import { UserFriend } from '../../../app/user-friend';
import { User, UserContext } from '../../../app/userContext';
import { ApiService } from '../../../utils/api/api.service';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.css'],
})
export class UserFriendsComponent implements OnInit {
  pendingRequests: UserFriend[] = [];
  pendingUsers: User[];
  userIds: number[] = [];
  friends: User[];
  confirmedRequests: UserFriend[];
  showFriends: boolean = true;

  @Input() userFriends: UserFriend[];
  @Input() users: User[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getPendingFriendsRequests();
    this.getAllFriends();
  }

  getPendingFriendsRequests(): void {
    this.pendingRequests = this.userFriends.filter(
      (userFriend) => userFriend.isPending
    );

    this.pendingUsers = this.users.filter((user) =>
      this.pendingRequests.some((userFriend) => userFriend.friendId === user.id)
    );
  }

  confirmFriendsRequest(id): void {
    let userFriendToAdd: UserFriend = this.userFriends.find(
      (user) => user.friendId === id
    );

    this.apiService
      .confirmFriendRequest(userFriendToAdd.id, { isPending: false })
      .subscribe(() => {
        userFriendToAdd.isPending = false;
        this.getPendingFriendsRequests();
      });
  }

  deleteFriendsRequest(id): void {
    let userFriendToDelete = this.userFriends.find(
      (user) => user.friendId === id
    );

    this.apiService
      .deleteFriendsRequest(userFriendToDelete.id)
      .subscribe(() => {
        this.userFriends = this.userFriends.filter(
          (userFriend) => userFriend !== userFriendToDelete
        );
        this.getPendingFriendsRequests();
      });
  }

  getAllFriends(): void {
    this.confirmedRequests = this.userFriends.filter(
      (userFriend) => !userFriend.isPending
    );

    this.friends = this.users.filter((user) =>
      this.confirmedRequests.some(
        (userFriend) => userFriend.friendId === user.id
      )
    );
  }

  showFriendsOrRequests(bool: boolean): void {
    this.showFriends = bool;
  }
}
