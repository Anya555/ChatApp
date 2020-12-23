import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../utils/api/api.service';
import { User, UserContext } from '../../../app/userContext';
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

      let friend = data.data.userFriends.find(
        (userFriend) => this.friendId === userFriend.friendId
      );
      console.log(friend);
      if (!friend) {
        this.isFriend = 'Add friend';
        this.disabled = false;
      }

      if (friend.isPending) {
        this.isFriend = 'Pending friend request';
        this.disabled = true;
      } else {
        this.isFriend = 'Friends';
        this.disabled = true;
      }
    });
  }

  sendFriendRequest(): void {
    this.apiService
      .sendFriendRequest(this.userContext.user.id, this.friendId)
      .subscribe((friend: User) => {
        this.isFriend = 'Pending friend request';
        this.disabled = true;
      });
  }
}
