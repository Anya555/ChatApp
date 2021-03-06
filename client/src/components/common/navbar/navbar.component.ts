import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import autocomplete from 'autocomplete.js';
import { User, UserContext } from '../../../app/userContext';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() isMessengerOpened: boolean;
  @Input() userName: string;
  @Input() users: User[];
  @Output() isMessengerOpenedEvent = new EventEmitter<boolean>();
  @Output() isChatRoomOpenedEvent = new EventEmitter<boolean>();
  constructor(
    public context: UserContext,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    autocomplete('#search-users', { hint: true }, [
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
            let imageUrl;
            if (suggestion.hasAvatarImage) {
              imageUrl = suggestion.imageUrl;
            } else {
              imageUrl = '/assets/images/avatar.png';
            }
            return `<img src=${imageUrl} width="30px" height="30px"/> ${suggestion.firstName} ${suggestion.lastName}`;
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

  openMessenger(): void {
    this.isMessengerOpened = !this.isMessengerOpened;
    this.isMessengerOpenedEvent.emit(this.isMessengerOpened);
    this.isChatRoomOpenedEvent.emit(false);
  }
}
