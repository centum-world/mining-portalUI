import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatDialogConfig } from '@angular/material';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-mining-sidebar',
  templateUrl: './mining-sidebar.component.html',
  styleUrls: ['./mining-sidebar.component.css']
})
export class MiningSidebarComponent implements OnInit {
  isVisible: boolean = false;

  constructor(private router:Router,private dialog: MatDialog,private userService:UserService) { }

  ngOnInit() {
    
  }

  toggleSidebar() {
    this.isVisible = !this.isVisible;
  }
  closeSidebar() {
    this.isVisible = false;
  }

  partnerViewList(){
    this.router.navigate(['/miningdashboard/partner-details'])
  }

  gotoDahashboard(){
    this.router.navigate(['/miningdashboard/home'])
  }
  

  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}
