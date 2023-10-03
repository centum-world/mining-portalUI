import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-block-sho',
  templateUrl: './block-sho.component.html',
  styleUrls: ['./block-sho.component.css']
})
export class BlockShoComponent implements OnInit {
  @Output() okClicked: EventEmitter<any> = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
  }

  blockSho(){
    this.okClicked.emit();
  }

}
