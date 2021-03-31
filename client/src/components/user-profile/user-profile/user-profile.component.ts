import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserContext } from '../../../app/userContext';
import { UserFriend } from '../../../app/user-friend';
import { Message } from '../../../app/message';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { SocketIoService } from '../../../utils/api/socket.io.service';
import { ChatRoomComponent } from '../../chat-room/chat-room/chat-room.component';
import { MessengerComponent } from '../../messenger/messenger/messenger.component';
import { ApiService } from '../../../utils/api/api.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

interface MessageToDeleteInfo {
  messageIdArr: number[];
  userId?: number;
}
interface ChatHistory {
  [key: number]: Message[];
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  @ViewChild(ChatRoomComponent) chatRoomComponent: ChatRoomComponent;
  @ViewChild(MessengerComponent) messengerComponent: MessengerComponent;
  chatHistory: ChatHistory = {};
  users: User[];
  userFriends: UserFriend[];
  isMessengerOpened: boolean = false;
  friends: User[];
  confirmedRequests: UserFriend[];
  isChatRoomOpened: boolean = false;
  currentUserName: string;
  friendId: number;
  userChats: Message[];
  isImageUploadFormOpened: boolean = false;
  imageUrl: Observable<string | null>;
  message: Message;
  constructor(
    private context: UserContext,
    private route: ActivatedRoute,
    private firebaseStorage: AngularFireStorage,
    private socketIoService: SocketIoService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.currentUserName =
      this.context.user.firstName + ' ' + this.context.user.lastName;
    this.route.data.subscribe((data) => {
      this.users = data.data.users;
      this.userFriends = data.data.userFriends;
      this.userChats = data.data.userChats;
      this.imageUrl = data.data.imageUrl;
      this.friends = data.data.friends;
    });
    this.getAllFriends();
    this.findAllMessagesBetweenTwoUsers();

    this.socketIoService.socket.on('addMessage', (message: Message) => {
      this.userChats.push(message);
      this.findAllMessagesBetweenTwoUsers();
      if (this.chatRoomComponent) {
        this.chatRoomComponent.messages.push(message);
        this.chatRoomComponent.updateMessageInfo();
      }
    });

    this.socketIoService.socket.on(
      'messageSeenByReceiver',
      (messageIdArr: number[]) => {
        this.userChats.forEach((message) => {
          if (messageIdArr.includes(message.id)) {
            message.seenByReceiver = true;
          }
        });
      }
    );

    this.socketIoService.socket.on(
      'deleteMessage',
      (messageToDeleteInfo: MessageToDeleteInfo) => {
        // update messenger component
        this.userChats.forEach((message: Message) => {
          if (messageToDeleteInfo.messageIdArr.includes(message.id)) {
            if (!message.userIdToDeleteChatHistory) {
              message.userIdToDeleteChatHistory = messageToDeleteInfo.userId;
            } else {
              if (
                messageToDeleteInfo.userId !== message.userIdToDeleteChatHistory
              ) {
                this.userChats = this.userChats.filter(
                  (messageToDelete: Message) =>
                    messageToDelete.id !== message.id
                );
              }
            }
          }
        });

        // update chatroom component
        if (this.chatRoomComponent) {
          this.chatRoomComponent.messages.forEach((message: Message) => {
            if (messageToDeleteInfo.messageIdArr.includes(message.id)) {
              if (!message.userIdToDeleteChatHistory) {
                message.userIdToDeleteChatHistory = messageToDeleteInfo.userId;
              } else {
                if (
                  messageToDeleteInfo.userId !==
                  message.userIdToDeleteChatHistory
                ) {
                  this.chatRoomComponent.messages = this.chatRoomComponent.messages.filter(
                    (messageToDelete: Message) =>
                      messageToDelete.id !== message.id
                  );
                }
              }
            }
          });
          console.log(this.chatRoomComponent.messages);
        }

        this.findAllMessagesBetweenTwoUsers();
      }
    );
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

  getAllFriends(): void {
    this.confirmedRequests = this.userFriends.filter(
      (userFriend) => !userFriend.isPending
    );

    this.friends = this.users.filter(
      (user) =>
        user.id !== this.context.user.id &&
        this.confirmedRequests.some(
          (userFriend) =>
            userFriend.userId === user.id || userFriend.friendId === user.id
        )
    );
  }

  updateIsMessengerOpened(newValue: boolean): void {
    this.isMessengerOpened = newValue;
  }
  updateIsChatRoomOpened(newValue: boolean): void {
    this.isChatRoomOpened = newValue;
  }

  getFriendId(id: number): void {
    this.friendId = id;
  }

  openImageUploadForm(): void {
    this.isImageUploadFormOpened = true;
  }

  updateIsImageUploadFormOpened(newValue: boolean): void {
    this.isImageUploadFormOpened = newValue;
  }

  updateIsNewMessageSentEvent(newUserChats: Message[]): void {
    this.userChats = newUserChats;
  }

  setImageUrl(): void {
    this.firebaseStorage
      .ref('image' + this.context.user.id)
      .getDownloadURL()
      .subscribe((url) => {
        this.imageUrl = url;
      });
  }

  deleteChatHistoryForLoggedInUser(friendId): void {
    let messageIdArr = [];
    this.chatHistory[friendId].forEach((message: Message) => {
      messageIdArr.push(message.id);
    });
    this.apiService
      .deleteChatHistoryForOneUser(this.context.user.id, messageIdArr)
      .subscribe(() => {});
  }

  deleteChatHistory(friendId): void {
    // if no messages have been deleted by either user than set userIdToDeleteChatHistory = to logged in user id for all messages

    let areAnyMessagesDeleted = this.chatHistory[friendId].some(
      (message: Message) => !!message.userIdToDeleteChatHistory
    );
    if (!areAnyMessagesDeleted) {
      this.deleteChatHistoryForLoggedInUser(friendId);
    } else {
      // if some messages have been deleted by the other user than remove those messages from database and for the messages that have not been deleted by the other user set userIdToDeleteChatHistory = to logged in user id
      let messageIdsDeletedByTheOtherUser = [];

      this.chatHistory[friendId].forEach((message: Message) => {
        if (message.userIdToDeleteChatHistory === friendId) {
          messageIdsDeletedByTheOtherUser.push(message.id);
        }
      });

      if (messageIdsDeletedByTheOtherUser.length) {
        this.apiService
          .deleteChatHistoryForBothUsers(messageIdsDeletedByTheOtherUser)
          .subscribe(() => {
            // update messages that have not been deleted by either user yet to have userIdToDeleteChatHistory set to logged in user id
            this.deleteChatHistoryForLoggedInUser(friendId);
          });
      }
      // if some messages deleted by logged in user but not deleted by the other user than set userIdToDeleteChatHistory = to logged in user id for all messages
      else {
        this.deleteChatHistoryForLoggedInUser(friendId);
      }
    }
  }
}
