import { Component, OnInit , Input} from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @Input() uid: string;
  contact: User;
  user: User;
  constructor(private userService: UserService) {

   }

  ngOnInit(): void {
    console.log(this.uid, 'uid')
    this.userService.getUserById(this.uid).valueChanges().subscribe((data: User) => {
      console.log(data)
      this.contact = data
    }, (e) => {console.log(e)})
  }

}
