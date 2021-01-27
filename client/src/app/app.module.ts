import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpModule } from '../components/sign-up/sign-up.module';
import { LoginModule } from '../components/login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileModule } from '../components/user-profile/user-profile.module';
import { UserContext } from './userContext';
import { AuthGuard } from './auth.guard';
import { GlobalErrorHandler } from './error-handler';
import { FriendProfileModule } from '../components/friend-profile/friend-profile.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignUpModule,
    LoginModule,
    NgbModule,
    HttpClientModule,
    UserProfileModule,
    FriendProfileModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
  ],
  providers: [
    UserContext,
    AuthGuard,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
