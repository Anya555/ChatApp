import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserContext } from '../../../app/userContext';
import { UserFriend } from '../../../app/user-friend';
import { Message } from '../../../app/message';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
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

  constructor(
    private context: UserContext,
    private route: ActivatedRoute,
    private firebaseStorage: AngularFireStorage
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

  setImageUrl(): void {
    this.firebaseStorage
      .ref('image' + this.context.user.id)
      .getDownloadURL()
      .subscribe((url) => {
        this.imageUrl = url;
      });
  }
}
