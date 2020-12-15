import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserContext } from '../../../app/userContext';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  users: User[];
  currentUserName =
    this.context.user.firstName + ' ' + this.context.user.lastName;
  constructor(public context: UserContext, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => (this.users = data.data));
  }
}