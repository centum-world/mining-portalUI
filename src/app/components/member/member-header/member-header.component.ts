import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-header',
  templateUrl: './member-header.component.html',
  styleUrls: ['./member-header.component.css']
})
export class MemberHeaderComponent implements OnInit {
  isVisible: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleSidebar() {
    this.isVisible = !this.isVisible;
  }

  closeSidebar() {
    this.isVisible = false;
  }
  
  

}
