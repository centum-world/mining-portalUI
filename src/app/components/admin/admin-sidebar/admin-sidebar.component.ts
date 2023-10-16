import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatDialogConfig } from '@angular/material';
import { PopupSidebarComponent } from '../popup-sidebar/popup-sidebar.component';
import { UserService } from 'src/app/service/user.service';
import { AccountsPaidWithdrawalComponent } from '../dialog/accounts-paid-withdrawal/accounts-paid-withdrawal.component';


@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  constructor(private router:Router,private dialog: MatDialog,private userService:UserService) { }

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

  openSideBar(){

    let config: MatDialogConfig = {
      position: { left: '0' }, 
      panelClass: 'popupSidebarDialogClass'
   };
   const dialogRef = this.dialog.open(PopupSidebarComponent, config);
    console.log("hiii")
  }
  // ------------------
  accountsPaidWithdrawal={
    partner:"",
    member:"",
    refferalPartner:"",
    totalwithdrawal:""
  }
  accountsPaidWithdrawalDialog(){

    this.userService.acountTotalPayout().subscribe({
      next: (response: any) => {
        if (response) {
          console.log(response)
          this.accountsPaidWithdrawal.partner = response.partner,
          this.accountsPaidWithdrawal.member = response.refferalMember,
          this.accountsPaidWithdrawal.refferalPartner = response.reffrePartner,
          this.accountsPaidWithdrawal.totalwithdrawal = response.totalWithdrawal
          
          let config: MatDialogConfig = {
            panelClass:'accountsPaidWithdrawalDialogClass',data:this.accountsPaidWithdrawal
         };
         const dialogRef = this.dialog.open(AccountsPaidWithdrawalComponent,config);
     
         dialogRef.afterClosed().subscribe(result => {
           console.log('The dialog was closed');
           // Do something with the result if needed
         });
        }
      },
      error: error => {
       console.log(error)
      }
    })


    
  }


  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])

  }
}
