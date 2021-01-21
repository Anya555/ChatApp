import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User, UserContext } from '../../../app/userContext';
import { NgForm } from '@angular/forms';
import { Message } from '../../../app/message';

interface ChatHistory {
  [key: number]: Message[];
}

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
})
export class MessengerComponent implements OnInit {
  filteredFriends: User[];
  chatHistory: ChatHistory = {};
  @Input() friends: User[];
  @Input() isMessengerOpened: boolean;
  @Input() isChatRoomOpened: boolean;
  @Input() userChats: Message[];
  @Output() isMessengerOpenedEvent = new EventEmitter<boolean>();
  @Output() isChatRoomOpenedEvent = new EventEmitter<boolean>();
  @Output() getFriendIdEvent = new EventEmitter<number>();
  constructor(private context: UserContext) {}

  ngOnInit(): void {
    console.log(this.userChats);
    this.findAllMessagesBetweenTwoUsers();
  }

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

  findAllMessagesBetweenTwoUsers(): void {
    this.friends.forEach((friend) => {
      // creates a chatHistory object, where each key is an 'id' of each user's friends and it's value is an array of all messages between them
      this.chatHistory[friend.id] = this.userChats.filter(
        (userChat) =>
          userChat.receiverId === friend.id || userChat.senderId === friend.id
      );
    });
  }
}
