import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../../utils/api/api.service';
import { User, UserContext } from '../../../app/userContext';
import { SocketIoService } from '../../../utils/api/socket.io.service';
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

  @Input() isChatRoomOpened: boolean;
  @Input() friendId: number;
  @Output() isChatRoomOpenedEvent = new EventEmitter<boolean>();
  constructor(
    private apiService: ApiService,
    private userContext: UserContext,
    private socketIoService: SocketIoService,
    private firebaseStorage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.socketIoService.socket.on('message', (message: Message) => {
      this.messages.push(message);
    });
    this.getChatHistory();
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
        this.getImageUrl(this.user);
        this.getImageUrl(this.friend);
      });
  }

  getImageUrl(user): void {
    if (user.hasAvatarImage) {
      this.firebaseStorage
        .ref('image' + user.id)
        .getDownloadURL()
        .subscribe((url) => {
          user.imageUrl = url;
        });
    }
  }

  deleteMessage(id): void {
    this.apiService.deleteMessage(id).subscribe(() => {
      this.messages = this.messages.filter((message) => message.id !== id);
    });
  }
}
