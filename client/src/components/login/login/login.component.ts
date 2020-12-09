import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../../utils/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User, UserContext } from '../../../app/userContext';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private context: UserContext,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  loginUser(f: NgForm): void {
    this.apiService.login(f.value).subscribe((userContext: UserContext) => {
      this.context.user = userContext.user;
      this.context.accessToken = userContext.accessToken;
      this.context.refreshToken = userContext.refreshToken;
      let authorizedUser = {
        accessToken: this.context.accessToken,
        refreshToken: this.context.refreshToken,
        id: this.context.user.id,
      };
      localStorage.setItem('authorizedUser', JSON.stringify(authorizedUser));
      this.router.navigate(['user-profile/', this.context.user.id]);
    });
  }
}
