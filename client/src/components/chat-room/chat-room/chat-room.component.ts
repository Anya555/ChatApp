import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../../utils/api/api.service';
import { User, UserContext } from '../../../app/userContext';
import { Message } from '../../../app/message';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit {
  messages: Message[];
  user: User;
  friend: User;
  @Input() message: Message;
  @Input() userChats: Message[];
  @Input() isChatRoomOpened: boolean;
  @Input() friendId: number;
  @Output() isChatRoomOpenedEvent = new EventEmitter<boolean>();
  @Output() isNewMessageSentEvent = new EventEmitter<Message[]>();
  @Output() deleteChatHistory = new EventEmitter<any>();
  constructor(
    private apiService: ApiService,
    private userContext: UserContext,
    private firebaseStorage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.getChatHistory();
    this.updateMessageInfo();
  }

  deleteChat(message: Message): void {
    let messageIdArr = [];
    messageIdArr.push(message.id);

    if (!message.userIdToDeleteChatHistory) {
      this.apiService
        .deleteChatHistoryForOneUser(this.userContext.user.id, messageIdArr)
        .subscribe(() => {});
    } else {
      this.apiService
        .deleteChatHistoryForBothUsers(messageIdArr)
        .subscribe(() => {});
    }
  }

  updateMessageInfo(): void {
    let messageIdArr: number[] = [];
    this.userChats.forEach((message) => {
      if (
        this.isChatRoomOpened &&
        this.userContext.user.id !== message.senderId
      ) {
        messageIdArr.push(message.id);
      }
    });

    this.apiService.updateMessageInfo(messageIdArr).subscribe(() => {});
  }

  closePrivateChatRoom(): void {
    this.isChatRoomOpened = false;
    this.isChatRoomOpenedEvent.emit(this.isChatRoomOpened);
  }

  onSubmit(f: NgForm): void {
    let messageData = {
      message: f.value.message,
      senderId: this.userContext.user.id,
      receiverId: this.friendId,
    };

    this.apiService.saveMessageToDB(messageData).subscribe(() => {
      f.reset();
    });
  }

  getChatHistory(): void {
    this.apiService
      .getChatHistory(this.userContext.user.id, this.friendId)
      .subscribe((data: { messages: Message[]; user: User; friend: User }) => {
        this.messages = data.messages;
        this.user = data.user;
        this.friend = data.friend;
        this.setImageUrl(this.friend);
      });
  }

  setImageUrl(user): void {
    if (user.hasAvatarImage) {
      this.firebaseStorage
        .ref('image' + user.id)
        .getDownloadURL()
        .subscribe((url) => {
          user.imageUrl = url;
        });
    }
  }

  isMessageSeen(messageToCheck: Message): boolean {
    let messagesSeenByReceiver: Message[] = this.messages.filter(
      (message) => message.seenByReceiver
    );

    if (
      messagesSeenByReceiver.length &&
      messageToCheck.id ===
        messagesSeenByReceiver[messagesSeenByReceiver.length - 1].id
    ) {
      return true;
    }
    return false;
  }
}
