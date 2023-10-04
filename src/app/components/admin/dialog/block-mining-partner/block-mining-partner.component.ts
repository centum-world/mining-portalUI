import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-block-mining-partner',
  templateUrl: './block-mining-partner.component.html',
  styleUrls: ['./block-mining-partner.component.css']
})
export class BlockMiningPartnerComponent implements OnInit {

  @Output() okClicked: EventEmitter<any> = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
  }

  blockPartner(){
    this.okClicked.emit();
  }
}
