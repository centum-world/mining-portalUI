import { Component, OnInit,Output,EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-verify-member',
  templateUrl: './verify-member.component.html',
  styleUrls: ['./verify-member.component.css']
})
export class VerifyMemberComponent implements OnInit {
  @Output() okClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  verifyMember(){
    this.okClicked.emit();
  }

}
