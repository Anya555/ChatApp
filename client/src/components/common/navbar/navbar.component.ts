import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import autocomplete from 'autocomplete.js';
import { User, UserContext } from '../../../app/userContext';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() userName: string;
  @Input() users: User[];

  constructor(
    public context: UserContext,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // find all registered users

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
    ]).on('autocomplete:selected', (event, suggestion, dataset, context) => {
      // navigate to user profile you click on
      this.router.navigate(['friend-profile/', suggestion.id]);
    });
  }

  signOut(): void {
    localStorage.removeItem('authorizedUser');
    this.router.navigate(['login']);
  }
}
