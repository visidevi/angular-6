import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import  { User } from '../interfaces/user'

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friends: User[] ;
  friend: User;
  constructor(private activatedRoute: ActivatedRoute) {
    this.friendId = this.activatedRoute.snapshot.params.uid;

    this.friends = [
      {nick: 'Eduardo', 
      subnick: 'Mi mensaje personal', 
      status: 'online', 
      age: 28, 
      email: 'eduardo@platzi.com', 
      uid: 1, friend: true},
      {nick: 'Yuliana',
       subnick: 'Mi mensaje personal',
       status: 'busy',
       age: 25,
       email: 'yuliana@platzi.com',
       uid: 2,
       friend: true},
      {nick: 'Freddy',
      subnick: 'Mi mensaje personal',
      status: 'away',
      age: 28,
      email: 'freddy@platzi.com',
      uid: 3,
      friend: false}
    ];
 this.friend = this.friends.find(item => item.uid == this.friendId)
    


  }

  ngOnInit(): void {
  }

}
