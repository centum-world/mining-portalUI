import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmApprovedComponent } from '../dialog/confirm-approved/confirm-approved.component';
import { MatDialog } from '@angular/material';
import { MatDialogConfig } from '@angular/material';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'
@Component({
  selector: 'app-bd-account',
  templateUrl: './bd-account.component.html',
  styleUrls: ['./bd-account.component.css']
})
export class BdAccountComponent implements OnInit {
  bdID: string;
  bdRequestHistory = [];
  bdApprovedHistory = [];
  bdBankDetails = [];
  bdWallet=0;
  constructor(private route: ActivatedRoute, private dialog: MatDialog, private userService : UserService, private toastr: ToastrService, private router: Router) { 
    this.route.params.subscribe(params => {
      this.bdID = params['id']; // Retrieve parameter 1
      console.log(this.bdID);
    });
  }

  ngOnInit() {
    this.tabChanged(0);
    this.bdOwnData();
  }

  tabChanged(tab:any){
    if(tab === 0){
      let data = {
        userId : this.bdID
      }
      this.userService.paymentRequestForSho(data).subscribe({
        next:(res:any)=>{
          console.log(res)
          this.bdRequestHistory = res.paymentRequests
        },
        error:(error=>{
          console.log(error.error.message)
        })

      })

    }else if(tab === 1){
      let data = {
        userId: this.bdID
      }
      this.userService.fetchPaymentApprovedForAll(data).subscribe({
        next:(res:any)=>{
          console.log(res.paymentApprovals)
          this.bdApprovedHistory = res.paymentApprovals
        },
        error:(err=>{
          console.log(err.error.message)
        })
      })
    }else if(tab === 2){
      let data = {
        userId:this.bdID
      }
      this.userService.fetchStateBankDetails(data).subscribe({
        next:(res:any)=>{
          console.log(res)
          this.bdBankDetails = res.result
        },
        error:(err=>{
          console.log(err.error.messsage)
        })
      })
    }
  }

  bdOwnData(){
   let data = {
    businessDeveloperId: this.bdID
   }
   this.userService.fetchBdPerticularDetials(data).subscribe({
    next:(res:any)=>{
      console.log(res)
      this.bdWallet = res.bdDetails.bdWallet;
    },
    error:(err=>{
      console.log(err.error.message)
    })
   })
    
  }


  approved(id:any){
    console.log(id)
    let config: MatDialogConfig = {
      panelClass: 'requsetApprovedDialogClass'
   };
   const dialogRef = this.dialog.open(ConfirmApprovedComponent, config);

     dialogRef.componentInstance.okClicked.subscribe(() => {
      let data = {
        id:id
      }
      this.userService.bdApproved(data).subscribe({
        next:(res:any)=>{
          console.log(res)
          this.tabChanged(0);
          this.toastr.success(res.message);
        },
        error:(err=>{
          console.log(err.error.message);
        })
      })
   })

   dialogRef.afterClosed().subscribe(result => {
     console.log("Closed");
   });
  }
  
  goBack(){
    this.router.navigate(['/dashboard/bd-history'])
  }
}
