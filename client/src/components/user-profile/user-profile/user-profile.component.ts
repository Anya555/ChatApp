import { Component, OnInit } from '@angular/core';
import { User, UserContext } from '../../../app/userContext';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import autocomplete from 'autocomplete.js';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  users: User[];

  constructor(
    public context: UserContext,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => (this.users = data.data));

    autocomplete('#search', { hint: true }, [
      {
        source: (inputValue, callBack) => {
          let filteredUsers = this.users.filter(
            (user) =>
              user.firstName
                .toLocaleLowerCase()
                .includes(inputValue.toLowerCase()) ||
              user.lastName.toLowerCase().includes(inputValue.toLowerCase())
          );

          callBack(filteredUsers);
        },

        templates: {
          suggestion: function (suggestion) {
            return suggestion.firstName + ' ' + suggestion.lastName;
          },
        },
      },
    ]).on(
      'autocomplete:selected',
      function (event, suggestion, dataset, context) {
        console.log(event, suggestion, dataset, context);
      }
    );
  }
  signOut(): void {
    localStorage.removeItem('tokens');
    this.router.navigate(['login']);
  }
}
