import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-white-paper',
  templateUrl: './white-paper.component.html',
  styleUrls: ['./white-paper.component.css']
})
export class WhitePaperComponent implements OnInit {
  isMobileSidebarVisible = false;
  constructor() { }

  ngOnInit() {
  }

  toggleMobileSidebar() {
    console.log("button pressed")
    this.isMobileSidebarVisible = !this.isMobileSidebarVisible;
  }

}
