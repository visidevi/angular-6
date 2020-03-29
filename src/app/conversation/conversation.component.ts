import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import  { User } from '../interfaces/user'
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friend: User;
  user: User;
  conversation_id: string;
  textMessage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private conversationService: ConversationService,
    private authenticationService: AuthenticationService ) {
    this.friendId = this.activatedRoute.snapshot.params.uid;

    this.authenticationService.getStatus().subscribe((session) => {
      this.userService.getUserById(session.uid).valueChanges().subscribe((data: User) => {
        this.user = data

        this.userService.getUserById(this.friendId).valueChanges().subscribe((data: User) => {
          this.friend = data
          console.log(this.friend.uid, this.user.uid)
          const ids = [this.user.uid, this.friend.uid].sort();
          console.log(ids)
          this.conversation_id = ids.join('|');
          console.log(data)
        }, (e) => { console.log(e) })

      }, (e) => { console.log(e) })
})




  }

  ngOnInit(): void {
  }
  getFriend() {
    return
  }
  sendMessage() {
    const message = {
      uid: this.conversation_id,
      timestap: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      reciver: this.friend.uid
    }
    this.conversationService.createConversation(message).then(() => {
      this.textMessage = ''
    })
  }
}
