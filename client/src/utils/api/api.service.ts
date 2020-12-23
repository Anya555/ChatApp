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
    console.log(id);
    console.log(isPending);
    return this.http.put('/api/users/user-profile/' + id, isPending);
  };
}
