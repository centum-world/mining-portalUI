import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-verify-partner',
  templateUrl: './verify-partner.component.html',
  styleUrls: ['./verify-partner.component.css']
})
export class VerifyPartnerComponent implements OnInit {
  @Output() okClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  verifyPartner(){
    this.okClicked.emit();
  }
}
