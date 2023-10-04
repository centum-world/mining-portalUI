import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  viewList(){
    this.router.navigate(['/dashboard/sho-history'])
  }
  FranchiseList(){
    this.router.navigate(['/dashboard/franchise-history'])
  }

  memberViewList(){
    this.router.navigate(['/dashboard/member-history'])
  }

  partnerViewList(){
    this.router.navigate(['dashboard/partner-history'])
  }


  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])

  }
}
