import { Component, OnInit } from '@angular/core';
import { UserContext } from '../../../app/userContext';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(public context: UserContext, private router: Router) {}

  ngOnInit(): void {}
  signOut(): void {
    localStorage.removeItem('tokens');
    this.router.navigate(['login']);
  }
}
