import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User, UserContext } from '../../../app/userContext';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
})
export class MessengerComponent implements OnInit {
  filteredFriends: User[];
  @Input() friends: User[];
  @Input() isMessengerOpened: boolean;
  @Input() isChatRoomOpened: boolean;
  @Output() isMessengerOpenedEvent = new EventEmitter<boolean>();
  @Output() isChatRoomOpenedEvent = new EventEmitter<boolean>();
  @Output() getFriendIdEvent = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  searchFriends(f: NgForm): void {
    this.filteredFriends = this.friends.filter(
      (user) =>
        user.firstName.toLowerCase().includes(f.value.search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(f.value.search.toLowerCase())
    );
    if (!f.value.search) {
      this.filteredFriends = [];
    }
  }

  openPrivateChat(id): void {
    this.isChatRoomOpened = true;
    this.isMessengerOpened = false;
    this.isMessengerOpenedEvent.emit(this.isMessengerOpened);
    this.isChatRoomOpenedEvent.emit(this.isChatRoomOpened);
    this.getFriendIdEvent.emit(id);
  }
}
