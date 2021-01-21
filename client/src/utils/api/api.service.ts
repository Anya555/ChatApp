import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/userContext';
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
    return this.http.get<User>('/api/users/user-profile/' + id);
  };

  findAllUsers = () => {
    return this.http.get('/api/users');
  };

  sendFriendRequest = (userId, friendId) => {
    return this.http.post(`/api/users/user-profile/${userId}/friend`, {
      friendId,
    });
  };

  findUserFriendsById = (id) => {
    return this.http.get('/api/users/friend-profile/' + id);
  };

  confirmFriendRequest = (id, isPending) => {
    return this.http.put('/api/users/user-profile/' + id, isPending);
  };

  deleteFriendsRequest = (id) => {
    return this.http.delete('/api/users/user-profile/' + id);
  };

  saveMessageToDB = (message) => {
    return this.http.post('/api/messenger', message);
  };

  getChatHistory = (senderId, receiverId) => {
    return this.http.get(
      `/api/messenger/user/${senderId}/friend/${receiverId}`
    );
  };

  findAllUserChats = (id) => {
    return this.http.get('/api/messenger/user/' + id);
  };
}
