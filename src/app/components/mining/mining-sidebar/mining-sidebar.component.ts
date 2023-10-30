import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatDialogConfig } from '@angular/material';
import { UserService } from 'src/app/service/user.service';
import { MiningAddBankComponent } from '../dialog/mining-add-bank/mining-add-bank.component';
import { MiningViewBankComponent } from '../dialog/mining-view-bank/mining-view-bank.component';

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
  partnerWithdraw(){
    this.router.navigate(['/miningdashboard/withdraw'])
  }

  gotoDahashboard(){
    this.router.navigate(['/miningdashboard/home'])
  }

  addBankDetails(){
    let config: MatDialogConfig = {
      panelClass: 'partnerBankDialogClass',
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
    this.router.navigate(['/miningdashboard/myteam'])
  }


  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}
