import { Injectable } from '@angular/core';

@Injectable()
export class UserContext {
  accessToken: string;
  refreshToken: string;
  url: string;
  user: User;
}

export class User {
  firstName: string;
  lastName: string;
  id: number;
  email: string;
  hasAvatarImage: boolean;
  password: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
}
