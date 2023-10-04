import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-verify-franchise',
  templateUrl: './verify-franchise.component.html',
  styleUrls: ['./verify-franchise.component.css']
})
export class VerifyFranchiseComponent implements OnInit {
  @Output() okClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  verifyFranchise(){
    this.okClicked.emit();
  }

}
