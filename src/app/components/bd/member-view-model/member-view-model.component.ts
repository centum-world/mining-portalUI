import { Component, OnInit ,EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-member-view-model',
  templateUrl: './member-view-model.component.html',
  styleUrls: ['./member-view-model.component.css']
})
export class MemberViewModelComponent implements OnInit {
  @Output() okClicked: EventEmitter<any> = new EventEmitter(); 

  constructor() { }

  ngOnInit() {
  }

}
