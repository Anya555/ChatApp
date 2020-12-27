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
  isOpened: boolean = false;
  friends: User[];
  confirmedRequests: UserFriend[];

  currentUserName =
    this.context.user.firstName + ' ' + this.context.user.lastName;
  constructor(public context: UserContext, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.users = data.data.users;
      this.userFriends = data.data.userFriends;
      this.getAllFriends();
    });
  }

  updateIsOpened(newValue: boolean): void {
    this.isOpened = newValue;
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
