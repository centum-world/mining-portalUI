import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatDialogConfig } from '@angular/material';
import { PopupSidebarComponent } from '../popup-sidebar/popup-sidebar.component';


@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  selectedItem: string = '';

  constructor(private router:Router,private dialog: MatDialog) { }

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

  openSideBar(){

    let config: MatDialogConfig = {
      position: { left: '0' }, 
      panelClass: 'popupSidebarDialogClass'
   };
   const dialogRef = this.dialog.open(PopupSidebarComponent, config);
    console.log("hiii")
  }


  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])

  }
}
