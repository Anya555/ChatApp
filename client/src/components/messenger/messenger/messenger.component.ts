import { Component, OnInit, Input } from '@angular/core';
import { User, UserContext } from '../../../app/userContext';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
})
export class MessengerComponent implements OnInit {
  filteredFriends: User[];
  @Input() friends: User[];
  @Input() isOpened: boolean;
  constructor() {}

  ngOnInit(): void {}
}
