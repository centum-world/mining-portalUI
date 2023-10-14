import { Component, OnInit , Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-member-verify-model',
  templateUrl: './member-verify-model.component.html',
  styleUrls: ['./member-verify-model.component.css']
})
export class MemberVerifyModelComponent implements OnInit {
  @Output() okClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  verifyBd(){
    this.okClicked.emit();
  }

}


// import { Component, OnInit , Output,EventEmitter} from '@angular/core';
// @Component({
//   selector: 'app-verify-modal',
//   templateUrl: './verify-modal.component.html',
//   styleUrls: ['./verify-modal.component.css']
// })
// export class VerifyModalComponent implements OnInit {
//   @Output() okClicked: EventEmitter<any> = new EventEmitter();
//   constructor() {

//    }

//   ngOnInit() {
//   }

//   verifyFranchise(){
//     this.okClicked.emit();
//   }

// }
