import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  signup = (user) => {

      return this.http.post("/api/users/signup", user)
  }

  login = (user) => {
    console.log(user, "api")
    return this.http.post("/api/users/login", user)
  }
}