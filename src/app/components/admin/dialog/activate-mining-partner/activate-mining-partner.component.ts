import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-activate-mining-partner',
  templateUrl: './activate-mining-partner.component.html',
  styleUrls: ['./activate-mining-partner.component.css']
})
export class ActivateMiningPartnerComponent implements OnInit {

  @Output() okClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  verifyPartner(){
    this.okClicked.emit();
  }

}
