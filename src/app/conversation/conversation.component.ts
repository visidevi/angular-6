import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import  { User } from '../interfaces/user'
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friend: User;
  price: Number =37.88888888;
  date: Date = new Date()
  constructor(
    private activatedRoute: ActivatedRoute,
     private  userService: UserService) {
    this.friendId = this.activatedRoute.snapshot.params.uid;
    this.friend = userService.getFriend(this.friendId);

  }

  ngOnInit(): void {
  }

}
