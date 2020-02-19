import { Component, OnInit } from '@angular/core';
import  { User } from '../interfaces/user'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {
   let myUser : User = {
    nick: 'Visidevi',
    age: 27,
    email: 'visidevi@gmail.com',
    friend: false,
    uid: '123'
   }
  let users: User[] = [
    myUser,
  ]
   console.log(myUser)
  }

  ngOnInit(): void {
  }

}
