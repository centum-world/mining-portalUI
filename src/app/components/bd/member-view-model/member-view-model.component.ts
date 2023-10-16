import { Component, OnInit ,EventEmitter, Output, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-member-view-model',
  templateUrl: './member-view-model.component.html',
  styleUrls: ['./member-view-model.component.css']
})
export class MemberViewModelComponent implements OnInit {
  
  @Output() okClicked: EventEmitter<any> = new EventEmitter(); 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  clickOk(){
    this.okClicked.emit();
  }

}
