import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatDialogConfig } from '@angular/material';
import { PopupSidebarComponent } from '../popup-sidebar/popup-sidebar.component';
import { UserService } from 'src/app/service/user.service';
import { AccountsPaidWithdrawalComponent } from '../dialog/accounts-paid-withdrawal/accounts-paid-withdrawal.component';
import { PartnerBondComponent } from '../dialog/partner-bond/partner-bond.component';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
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
  viewList(){
    this.router.navigate(['/dashboard/sho-history'])
    this.isVisible = false;
  }
  FranchiseList(){
    this.router.navigate(['/dashboard/franchise-history'])
    this.isVisible = false;
  }

  memberViewList(){
    this.router.navigate(['/dashboard/member-history'])
    this.isVisible = false;
  }

  partnerViewList(){
    this.router.navigate(['dashboard/partner-history'])
    this.isVisible = false;
  }

  viewActivePartnerList(){
    this.router.navigate(['/dashboard/active-partners']);
    this.isVisible = false;
  }

  
  BdHistory(){
    this.router.navigate(['/dashboard/bd-history'])
    this.isVisible = false;
  }

  transactionHistory(){
    this.router.navigate(['/dashboard/transaction-history'])
    this.isVisible = false;
  }

  referralPayout(){
    this.router.navigate(['/dashboard/referral-payout'])
    this.isVisible = false;
  }

  gotoDahashboard(){
    this.router.navigate(['/dashboard'])
  }
  // ------------------
  accountsPaidWithdrawal={
    partner:"",
    member:"",
    refferalPartner:"",
    totalwithdrawal:""
  }
  accountsPaidWithdrawalDialog(){
    this.isVisible = false;
    this.userService.acountTotalPayout().subscribe({
      next: (response: any) => {
        if (response) {
          console.log(response)
          this.accountsPaidWithdrawal.partner = response.partner,
          this.accountsPaidWithdrawal.member = response.refferalMember,
          this.accountsPaidWithdrawal.refferalPartner = response.reffrePartner,
          this.accountsPaidWithdrawal.totalwithdrawal = response.totalWithdrawal
          
          let config: MatDialogConfig = {
            panelClass:'accountsPaidWithdrawalDialogClass',
            data:this.accountsPaidWithdrawal
         };
         const dialogRef = this.dialog.open(AccountsPaidWithdrawalComponent,config);
     
         dialogRef.afterClosed().subscribe(result => {
           console.log('The dialog was closed');
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
