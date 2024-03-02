import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-authorize',
  templateUrl: './confirm-authorize.component.html',
  styleUrls: ['./confirm-authorize.component.css']
})
export class ConfirmAuthorizeComponent implements OnInit {
  @Output() authorize: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  authorizeBank(){
    this.authorize.emit({ click:true});
  }

}
