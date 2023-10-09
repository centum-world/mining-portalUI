import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  selectedItem: string = '';

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

  viewActivePartnerList(){
    this.router.navigate(['/dashboard/active-partners']);
  }

  viewPartnerWalletHistoryList(){
    this.router.navigate(['/dashboard/partner-wallet-history'])
  }
  BdHistory(){
    this.router.navigate(['/dashboard/bd-history'])
  }

  gotoDahashboard(){
    this.router.navigate(['/dashboard'])
  }

  selectItem(itemName: string) {
    this.selectedItem = itemName;
  }


  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])

  }
}
