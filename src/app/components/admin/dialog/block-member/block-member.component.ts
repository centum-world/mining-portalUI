import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-block-member',
  templateUrl: './block-member.component.html',
  styleUrls: ['./block-member.component.css']
})
export class BlockMemberComponent implements OnInit {
  @Output() okClicked: EventEmitter<any> = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
  }

  blockMember(){
    this.okClicked.emit();
  }
}
