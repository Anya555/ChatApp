import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  showFriends: boolean = true;

  @Input() userFriends: UserFriend[];
  @Input() users: User[];
  @Input() friends: User[];
  @Output() updateFriendsEvent = new EventEmitter<void>();
  constructor(
    private apiService: ApiService,
    private userContext: UserContext
  ) {}

  ngOnInit(): void {
    this.getPendingFriendsRequests();
  }

  getPendingFriendsRequests(): void {
    this.pendingRequests = this.userFriends.filter(
      (userFriend) =>
        userFriend.isPending && userFriend.userId !== this.userContext.user.id
    );

    this.pendingUsers = this.users.filter((user) =>
      this.pendingRequests.some((userFriend) => userFriend.userId === user.id)
    );
  }

  confirmFriendsRequest(id): void {
    let userFriendToAdd: UserFriend = this.userFriends.find(
      (user) => user.userId === id
    );

    this.apiService
      .confirmFriendRequest(userFriendToAdd.id, { isPending: false })
      .subscribe(() => {
        userFriendToAdd.isPending = false;
        this.getPendingFriendsRequests();
        this.updateFriendsEvent.emit();
      });
  }

  deleteFriendsRequest(id): void {
    let userFriendToDelete = this.userFriends.find(
      (userFriend) => userFriend.userId === id
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

  showFriendsOrRequests(bool: boolean): void {
    this.showFriends = bool;
  }
}
