import { Injectable } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) {}
    // Login
    loginWithEmail(email: string, password: string ) {
      return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
    }
    // Register
    registerWithEmail(email: string, password: string ) {
      return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
    }
    // GetStatus-
    getStatus() {
      return this.angularFireAuth.authState;
    }
    // logout
    logOut() {
      return this.angularFireAuth.auth.signOut()
    }
}
