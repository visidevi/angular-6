import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  frendId: any;
  constructor(private activatedRoute: ActivatedRoute) {
    this.frendId = this.activatedRoute.snapshot.params.uid


  }

  ngOnInit(): void {
  }

}
