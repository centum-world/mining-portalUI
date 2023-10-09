import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bd-verify',
  templateUrl: './bd-verify.component.html',
  styleUrls: ['./bd-verify.component.css']
})
export class BdVerifyComponent implements OnInit {
  @Output() okClicked: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  verifyBd(){
    this.okClicked.emit();
  }
}
