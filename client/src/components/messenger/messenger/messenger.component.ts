import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User, UserContext } from '../../../app/userContext';
import { Message } from '../../../app/message';
import autocomplete from 'autocomplete.js';
interface ChatHistory {
  [key: number]: Message[];
}

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
})
export class MessengerComponent implements OnInit {
  chatHistory: ChatHistory = {};
  user: User;
  @Input() friends: User[];
  @Input() isMessengerOpened: boolean;
  @Input() isChatRoomOpened: boolean;
  @Input() userChats: Message[];
  @Output() isMessengerOpenedEvent = new EventEmitter<boolean>();
  @Output() isChatRoomOpenedEvent = new EventEmitter<boolean>();
  @Output() getFriendIdEvent = new EventEmitter<number>();
  constructor(private context: UserContext) {}

  ngOnInit(): void {
    this.user = this.context.user;
    this.findAllMessagesBetweenTwoUsers();
  }
  ngAfterViewInit(): void {
    autocomplete('#search-friends', { hint: true }, [
      {
        source: (inputValue, callBack) => {
          let filteredFriends = this.friends.filter(
            (user) =>
              user.firstName
                .toLocaleLowerCase()
                .includes(inputValue.toLowerCase()) ||
              user.lastName.toLowerCase().includes(inputValue.toLowerCase())
          );

          callBack(filteredFriends);
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
      this.openPrivateChat(suggestion.id);
    });
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
