import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-approved',
  templateUrl: './confirm-approved.component.html',
  styleUrls: ['./confirm-approved.component.css']
})
export class ConfirmApprovedComponent implements OnInit {
  @Output() okClicked: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  confirm(){
    this.okClicked.emit()
  }
}
