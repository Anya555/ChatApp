import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SignUpModule} from '../components/sign-up/sign-up.module';
import {LoginModule} from '../components/login/login.module';
import { HttpClientModule } from '@angular/common/http';
import {UserProfileModule} from '../components/user-profile/user-profile.module'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignUpModule,
    LoginModule,
    NgbModule,
    HttpClientModule,
    UserProfileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
