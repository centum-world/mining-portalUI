import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'app-block-franchise',
  templateUrl: './block-franchise.component.html',
  styleUrls: ['./block-franchise.component.css']
})
export class BlockFranchiseComponent implements OnInit {
  @Output() okClicked: EventEmitter<any> = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
  };

  blockFranchise(){
    this.okClicked.emit();
  }

}
