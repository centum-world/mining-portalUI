import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatDialogConfig } from '@angular/material';
import { UserService } from 'src/app/service/user.service';
import { MiningAddBankComponent } from '../dialog/mining-add-bank/mining-add-bank.component';
import { MiningViewBankComponent } from '../dialog/mining-view-bank/mining-view-bank.component';
import { HelpSupportComponent } from '../dialog/help-support/help-support.component';

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
    this.isVisible = false;
  }
  partnerWithdraw(){
    this.router.navigate(['/miningdashboard/withdraw'])
    this.isVisible = false;
  }

  gotoDahashboard(){
    this.router.navigate(['/miningdashboard/home'])
  }

  addBankDetails(){
    let config: MatDialogConfig = {
      panelClass: 'partnerAddBankDialogClass',
    };
    const dialogRef = this.dialog.open(MiningAddBankComponent,config)
    
    dialogRef.afterClosed().subscribe(result => {
     
    });
    
  }
  
  viewBankDetails(){
    let config: MatDialogConfig = {
      panelClass: 'stateViewBankDetailsDialogClass',
    };
    const dialogRef = this.dialog.open(MiningViewBankComponent,config)
    
    dialogRef.afterClosed().subscribe(result => {
     
    });
   
  }

  myteam(){
    this.isVisible = false;
    this.router.navigate(['/miningdashboard/my-team'])
  }

  FranchiseList(){

  }
  memberViewList(){

  }
  viewList(){

  }

  helpAndSupport(){
    this.isVisible = false;
    let config: MatDialogConfig = {
      panelClass: 'helpAndSupportClass',
    };
    const dialogRef = this.dialog.open(HelpSupportComponent,config)
    
    dialogRef.afterClosed().subscribe(result => {
     
    });
    
  }
  

  logOut(){
    localStorage.clear();
    this.router.navigate(['/mininglogin'])
  }

}
