import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-bd-block',
  templateUrl: './bd-block.component.html',
  styleUrls: ['./bd-block.component.css']
})
export class BdBlockComponent implements OnInit {
  @Output() okClicked: EventEmitter<any> = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    console.log(data.isBlocked)
  }

  ngOnInit() {

  }

  Block(){
    this.okClicked.emit();
  }
}
