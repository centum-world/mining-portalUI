import { Component, OnInit,EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-member-block-model',
  templateUrl: './member-block-model.component.html',
  styleUrls: ['./member-block-model.component.css']
})
export class MemberBlockModelComponent implements OnInit {
  @Output() okClicked: EventEmitter<any> = new EventEmitter();
   constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    
   }

  ngOnInit() {
  }

    blockBd(){
    this.okClicked.emit();
  }

}

// import { Component, OnInit,EventEmitter, Output } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Inject } from '@angular/core';

// @Component({
//   selector: 'app-block-modal',
//   templateUrl: './block-modal.component.html',
//   styleUrls: ['./block-modal.component.css']
// })
// export class BlockModalComponent implements OnInit {
//   @Output() okClicked: EventEmitter<any> = new EventEmitter();
//   constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    
//    }

//   ngOnInit() {
    
//   }

//   blockFranchise(){
//     this.okClicked.emit();
//   }

// }

