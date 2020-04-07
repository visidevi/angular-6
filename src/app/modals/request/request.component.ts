import { Component, Input, ViewChild, OnInit , TemplateRef} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { RequestService } from 'src/app/services/request.service';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../interfaces/user';
import { Subject } from 'rxjs';

export interface PromptModel {
  scope: any;
  currentRequest: any;
}
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})

export class RequestComponent implements OnInit  {
  @ViewChild("contentR") modalContent: TemplateRef<any>;
  scope: any;
  currentRequest: any;
  shouldAdd: string = "yes";
  friend: User;
  @Input() parentSubject: Subject<any>;

  constructor(
    private userService: UserService,
    private requestService: RequestService,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,) {


  }

  ngOnInit() {
    this.parentSubject.subscribe(event => {
      // called when the notifyChildren method is
      // called in the parent component
      const {currentRequest, scope } = event
      this.currentRequest = currentRequest;
      this.scope = scope;
      this.open()
      console.log('open-modal', this.scope.user.uid)
    });
  }
  ngOnDestroy() {
    // needed if child gets re-created (eg on some model changes)
    // note that subsequent subscriptions on the same subject will fail
    // so the parent has to re-create parentSubject on changes
    this.parentSubject.unsubscribe();
  }
  accept() {
    console.log(this.shouldAdd, this.currentRequest.sender, this.scope.user.uid)
    if (this.shouldAdd === 'yes') {
      this.requestService.setRequestStatus(this.currentRequest, 'accepted').then((data) => {
        this.userService.addFriend(this.scope.user.uid, this.currentRequest.sender).then((res) => {
          this.modalService.dismissAll()
       })
      }).catch((e) => {console.log(e)})
    } else if (this.shouldAdd === 'no') {
      this.requestService.setRequestStatus(this.currentRequest, 'rejected').then((data) => {
        console.log(data)
      }).catch((e) => { console.log(e) })
    } else if (this.shouldAdd === 'later') {
      this.requestService.setRequestStatus(this.currentRequest, 'decide_later').then((data) => {
        console.log(data)
      }).catch((e) => { console.log(e) })
    }
    // this.result = true;
    // this.close();
  }
  open() {
    this.userService.getUserById(this.currentRequest.sender).valueChanges().subscribe((data: User) => {
      this.friend = data
      this.modalService.open(this.modalContent).result.then((result) => {
        console.log(result)
      });
    }, (e) => { console.log(e) })

  }


}
