import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/userContext';
import { UserFriend } from 'src/app/user-friend';
import { Message } from 'src/app/message';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  signup = (user) => {
    return this.http.post('/api/users/signup', user);
  };

  login = (user) => {
    return this.http.post('/api/users/login', user);
  };

  findUserById = (id: string): Observable<User> => {
    return this.http.get<User>('/api/users/' + id);
  };

  findAllUsers = (): Observable<User[]> => {
    return this.http.get<User[]>('/api/users');
  };

  sendFriendRequest = (userId, friendId) => {
    return this.http.post(`/api/users/${userId}/friends`, {
      friendId,
    });
  };

  findUserFriendsById = (id): Observable<UserFriend[]> => {
    return this.http.get<UserFriend[]>(`/api/users/${id}/friends`);
  };

  updateUserFriend = (id, userFriend) => {
    return this.http.put('/api/users/friends/' + id, userFriend);
  };

  deleteFriendsRequest = (id) => {
    return this.http.delete('/api/users/friends/' + id);
  };

  saveMessageToDB = (message) => {
    return this.http.post('/api/messenger', message);
  };

  getChatHistory = (senderId, receiverId) => {
    return this.http.get(
      `/api/messenger/user/${senderId}/friend/${receiverId}`
    );
  };

  findAllUserChats = (id): Observable<Message[]> => {
    return this.http.get<Message[]>('/api/messenger/user/' + id);
  };

  updateUser = (id, user) => {
    return this.http.put('/api/users/' + id, user);
  };

  deleteChatHistoryForOneUser = (userId: number, messageIdArr: number[]) => {
    return this.http.put(`/api/messenger/user/${userId}`, messageIdArr);
  };

  deleteChatHistoryForBothUsers = (messageIdArr: number[]) => {
    let str = 'id=';
    messageIdArr.forEach((id) => {
      str += id;
      if (id !== messageIdArr[messageIdArr.length - 1]) {
        str += '&id=';
      }
    });

    return this.http.delete('/api/messenger?' + str);
  };

  updateMessageInfo = (messageIdArr: number[]) => {
    return this.http.put('/api/messenger', messageIdArr);
  };
}
