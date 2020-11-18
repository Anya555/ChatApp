import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../../utils/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  
  }

  addNewUser(f: NgForm) : void{
   this.apiService.signup(f.value).subscribe((data) => {
   console.log(data);
  f.resetForm();
  this.router.navigate(['user-profile']); 

})
  }

 

}
