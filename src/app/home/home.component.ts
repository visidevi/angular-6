import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user'
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  friends: User[]
  query: string = '';
  friendEmail: string = '';
  user: User;

  constructor(private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal,
    private requestService: RequestService) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        if (this.user.friends) {
          this.user.friends = Object.values(this.user.friends)
          console.log(this.user.friends)
        }
          console.log(this.user)
      }, (e) => { console.log(e) })
    }, (error) => {
      console.log(error)
    })
    this.userService.getUsers()
      .valueChanges()
      .subscribe((data: User[]) => {
        this.friends = data
      }, (e) => { console.log(e) })
  }

  ngOnInit(): void {
  }
  logout() {
    this.authenticationService.logOut().then((data) => {
      this.router.navigate(['login'])
      console.log(data)
    }).catch((e) => { console.log(e) })
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {

    });
  }
  sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.user.uid,
      sender_nick: this.user.nick,
      status: 'pending',
    }
    this.requestService.createRequest(request).then((data) => {
      console.log('Solicitud Enviada')
    }).catch((e) => { console.log(e) })
  }
}
