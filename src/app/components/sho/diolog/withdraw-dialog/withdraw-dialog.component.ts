import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-withdraw-dialog',
  templateUrl: './withdraw-dialog.component.html',
  styleUrls: ['./withdraw-dialog.component.css']
})
export class WithdrawDialogComponent implements OnInit {

  amount:Number
  constructor() { }

  ngOnInit() {
  }


  enterAmount(value:any){
    this.amount = value
    console.log(value)
  }
}
