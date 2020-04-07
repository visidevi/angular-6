import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { RequestService } from './services/request.service';
import { AuthenticationService } from './services/authentication.service';
import { User } from './interfaces/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'messenger';
  user: User;
  requests: any[] = [];
  mailsShow: any[] = [];
  parentSubject: Subject<any> = new Subject();

  constructor(public router: Router,
    private userService: UserService,
    private requestService: RequestService,
    private authenticationService: AuthenticationService) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        this.requestService.getRequestsForEmail(this.user.email).valueChanges().subscribe((data: any) => {
          this.requests = data
          this.requests = this.requests.filter((r) => {
            return r.status != 'accepted' && r.status != 'rejected';
          })
          this.requests.forEach((r) => {
            if (this.mailsShow.indexOf(r.sender) === -1) {
              this.mailsShow.push(r.sender);
              this.parentSubject.next({scope: this, currentRequest: r});
            }
          })

        }, (e) => { console.log(e) })

      }, (e) => { console.log(e) })
    }, (error) => {
      console.log(error)
    })

  }
}
