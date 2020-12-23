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
  @Input() userFriends: UserFriend[];
  @Input() users: User[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getPendingFriendsRequests();
  }

  getPendingFriendsRequests(): void {
    this.pendingRequests = this.userFriends.filter(
      (userFriend) => userFriend.isPending
    );
    console.log(this.pendingRequests);

    this.pendingRequests.forEach((request) =>
      this.userIds.push(request.friendId)
    );

    this.pendingUsers = this.users.filter((user) =>
      this.userIds.includes(user.id)
    );
  }

  confirmFriendsRequest(id): void {
    let userToAdd = this.pendingRequests.find((user) => (user.friendId = id));
    this.apiService
      .confirmFriendRequest(userToAdd.id, { isPending: false })
      .subscribe(() => {
        console.log(this.pendingRequests);
        this.getPendingFriendsRequests();
      });
  }
}
