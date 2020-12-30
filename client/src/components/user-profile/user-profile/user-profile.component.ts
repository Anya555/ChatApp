import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserContext } from '../../../app/userContext';
import { UserFriend } from '../../../app/user-friend';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  users: User[];
  userFriends: UserFriend[];
  isMessengerOpened: boolean = false;
  friends: User[];
  confirmedRequests: UserFriend[];
  isChatRoomOpened: boolean = false;
  currentUserName: string;

  constructor(public context: UserContext, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentUserName =
      this.context.user.firstName + ' ' + this.context.user.lastName;
    this.route.data.subscribe((data) => {
      this.users = data.data.users;
      this.userFriends = data.data.userFriends;
      this.getAllFriends();
    });
  }

  updateIsMessengerOpened(newValue: boolean): void {
    this.isMessengerOpened = newValue;
  }
  updateIsChatRoomOpened(newValue: boolean): void {
    this.isChatRoomOpened = newValue;
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
}
