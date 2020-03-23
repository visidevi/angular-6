import { Injectable } from '@angular/core';

import  { User } from '../interfaces/user'
import { AngularFireDatabase } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  [x: string]: any;
  friends: User[] ;
  constructor(private angularFireDatabase: AngularFireDatabase ) {

    // this.friends = [
    //   {
    //     nick: 'Eduardo',
    //     subnick: 'Mi mensaje personal',
    //     status: 'online',
    //     age: 28,
    //     email: 'eduardo@platzi.com',
    //     uid: 1, friend: true
    //   },
    //   {
    //     nick: 'Yuliana',
    //     subnick: 'Mi mensaje personal',
    //     status: 'busy',
    //     age: 25,
    //     email: 'yuliana@platzi.com',
    //     uid: 2,
    //     friend: true
    //   },
    //   {
    //     nick: 'Freddy',
    //     subnick: 'Mi mensaje personal',
    //     status: 'away',
    //     age: 28,
    //     email: 'freddy@platzi.com',
    //     uid: 3,
    //     friend: false
    //   }
    // ]
  }
  getUsers() {
    return this.angularFireDatabase.list('/users');
  }
  getUserById(uid) {
    return this.angularFireDatabase.object(`/users/${uid}`);
  }
  createUser(user) {
    return this.angularFireDatabase.object(`/users/${user.uid}`).set(user);
  }
  editUser(user) {
    return this.angularFireDatabase.object(`/users/${user.uid}`).set(user);
  }
  getFriends() {
    return this.friends
  }
  getFriend(uid) {
    return this.friends.find(item => item.uid == uid)
  }
}
