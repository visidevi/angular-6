import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  operation: string =  'login'
  email: string = null
  password: string = null
  nick: string = null
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }
  login() {
    console.log('login')
    this.authenticationService.loginWithEmail(this.email, this.password
    ).then((data) => {
      alert('Login')
      console.log(data)
    }).catch((e) => alert(e))
  }

  register() {
    this.authenticationService.registerWithEmail(
      this.email, this.password
    ).then((data) => {
      alert('Registrado')
      console.log(data)
    }).catch((e) => alert(e))
  }

}
