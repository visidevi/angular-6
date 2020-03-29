import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  operation: string =  'register'
  email: string = null
  password: string = null
  nick: string = null
  constructor(private authenticationService: AuthenticationService, 
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }
  login() {
    console.log('login')
    this.authenticationService.loginWithEmail(this.email, this.password
    ).then((data) => {
      // alert('Login')
      console.log(data)
      this.router.navigate(['home'])
    }).catch((e) => alert(e))
  }

  register() {
    this.authenticationService.registerWithEmail(
      this.email, this.password
    ).then((data) => {
      const user = {
        uid: data.user.uid,
        email: this.email,
        nick: this.nick,
      }
      this.userService.createUser(user).then((dataUser) => {
        // alert('Registrado')
        this.router.navigate(['home'])
        console.log(dataUser)
      }).catch((e) => alert(e))

    }).catch((e) => alert(e))
  }

}
