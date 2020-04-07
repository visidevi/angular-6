import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import  { User } from '../interfaces/user'
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  [x: string]: any;
  friendId: any;
  friend: User;
  user: User;
  conversation_id: string;
  textMessage: string = '';
  conversation: any = [];
  shake: boolean = false;
  croppedImage: any = '';
  picture: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private conversationService: ConversationService,
    private authenticationService: AuthenticationService,
    private firebaseStorage: AngularFireStorage ) {
    this.friendId = this.activatedRoute.snapshot.params.uid;

    this.authenticationService.getStatus().subscribe((session) => {
      this.userService.getUserById(session.uid).valueChanges().subscribe((data: User) => {
        this.user = data
        this.userService.getUserById(this.friendId).valueChanges().subscribe((data: User) => {
          this.friend = data
          const ids = [this.user.uid, this.friend.uid].sort();
          this.conversation_id = ids.join('|');
          this.getConversation();
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
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'text',
    }
    this.conversationService.createConversation(message).then(() => {
      this.textMessage = ''
    })
  }
  getConversation() {
    this.conversationService.getConversation(this.conversation_id).valueChanges().subscribe((conversation) => {
      this.conversation = conversation
      this.conversation.forEach((message) => {
        if (!message.seen) {
          message.seen = true,
            this.conversationService.editConversation(message);
          if (message.type != "zumbido") {
            const audio = new Audio('assets/sound/new_message.m4a')
            audio.play()
          } else if (message.type === "zumbido") {
            this.doZumbido()
          }
        }
      })
    }), (e) => {
      console.log(e)
    }
  }
  getUserByNickid(id) {
    if (id === this.friend.uid) {
      return this.friend.nick;
    } else {
      return this.user.nick
     }
  }
  sendZumbido() {
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: `${this.user.nick} ha enviado un zumbido`,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'zumbido',
    }
    console.log(message.type)
    this.conversationService.createConversation(message).then(() => { })
    this.doZumbido()
  }
  doZumbido() {
    const audio = new Audio('assets/sound/zumbido.m4a')
    audio.play()
    this.shake = true;
    window.setTimeout(() => {
      this.shake = false;
    }, 1000)
  }
  sendPicture() {
    const currentPictureId = Date.now();
    const pictures = this.firebaseStorage.ref(`pictures/${currentPictureId}.jpg`).putString(this.croppedImage, 'data_url');
    pictures.then((result) => {
      console.log(result)
      this.picture = this.firebaseStorage.ref(`pictures/${currentPictureId}.jpg`).getDownloadURL();
      this.picture.subscribe((pic) => {
        const message = {
          uid: this.conversation_id,
          timestamp: Date.now(),
          text: this.textMessage,
          sender: this.user.uid,
          receiver: this.friend.uid,
          type: 'image',
          url: pic,
        }
        this.croppedImage = ''
        this.conversationService.createConversation(message).then(() => { })
      });
    }).catch((error) => {
      console.log(error);
    });

  }
  changeListener(e): void {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.loaded = false;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    console.log("_handleReaderLoaded")
    var reader = e.target;
    this.croppedImage = reader.result;
    this.loaded = true;
    this.sendPicture()

  }

}
