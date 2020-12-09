import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../../utils/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserContext } from '../../../app/userContext';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private context: UserContext,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  addNewUser(f: NgForm): void {
    this.apiService.signup(f.value).subscribe((userContext: UserContext) => {
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
