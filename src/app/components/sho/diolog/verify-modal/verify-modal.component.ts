import { Component, OnInit , Output,EventEmitter} from '@angular/core';
@Component({
  selector: 'app-verify-modal',
  templateUrl: './verify-modal.component.html',
  styleUrls: ['./verify-modal.component.css']
})
export class VerifyModalComponent implements OnInit {
  @Output() okClicked: EventEmitter<any> = new EventEmitter();
  constructor() {

   }

  ngOnInit() {
  }

  verifyFranchise(){
    this.okClicked.emit();
  }

}
