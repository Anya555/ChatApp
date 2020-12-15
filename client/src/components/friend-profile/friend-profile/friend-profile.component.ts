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
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userContext: UserContext
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((user) => {
      this.friendId = user.data.id;
      this.currentUserName = user.data.firstName + ' ' + user.data.lastName;
    });
  }

  addFriend(): void {
    this.apiService
      .addFriend(this.userContext.user.id, this.friendId)
      .subscribe((friend: User) => {
        console.log(friend);
      });
  }
}
