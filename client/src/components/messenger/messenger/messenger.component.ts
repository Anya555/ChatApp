import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User, UserContext } from '../../../app/userContext';
import { Message } from '../../../app/message';
import autocomplete from 'autocomplete.js';
import { ApiService } from '../../../utils/api/api.service';

interface ChatHistory {
  [key: number]: Message[];
}

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
})
export class MessengerComponent implements OnInit {
  user: User;
  @Input() friends: User[];
  @Input() isMessengerOpened: boolean;
  @Input() isChatRoomOpened: boolean;
  @Input() userChats: Message[];
  @Output() isMessengerOpenedEvent = new EventEmitter<boolean>();
  @Output() isChatRoomOpenedEvent = new EventEmitter<boolean>();
  @Output() getFriendIdEvent = new EventEmitter<number>();
  @Output() deleteChatHistory = new EventEmitter<any>();
  @Input() chatHistory: ChatHistory;
  constructor(private context: UserContext, private apiService: ApiService) {}

  deleteChat(friendId): void {
    // this is called from user-profile component
    this.deleteChatHistory.emit(friendId);
  }
  ngOnInit(): void {
    this.user = this.context.user;
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

  isChatHistoryDeleted(chatHistory: Message[]): boolean {
    let messagesNotDeleted: Message[] = chatHistory.filter(
      (message) => message.userIdToDeleteChatHistory !== this.context.user.id
    );

    // if all messages have been deleted
    if (messagesNotDeleted.length === 0) {
      return true;
    }
    return false;
  }

  getLastMessageNotDeletedByUser(messages: Message[]): Message {
    // reduceRight
    return messages
      .reduceRight((prev, curr) => {
        prev.push(curr);
        return prev;
      }, [])
      .find(
        (message) => message.userIdToDeleteChatHistory !== this.context.user.id
      );
  }
}
