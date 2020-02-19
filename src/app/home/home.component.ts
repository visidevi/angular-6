import { Component, OnInit } from '@angular/core';
import  { User } from '../interfaces/user'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  friends: User[] ;

  constructor() {
   let myUser : User = {
    nick: 'Visidevi',
    age: 27,
    email: 'visidevi@gmail.com',
    friend: false,
    uid: '123'
   };
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
  ]

   console.log(myUser)
  }

  ngOnInit(): void {
  }

}
