import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { ConfirmApprovedComponent } from '../components/admin/dialog/confirm-approved/confirm-approved.component';

@Component({
  selector: 'app-franchise-account',
  templateUrl: './franchise-account.component.html',
  styleUrls: ['./franchise-account.component.css']
})
export class FranchiseAccountComponent implements OnInit {
  franchiseID: string
  bankDetails: []
  franchiseHistory = []
  approvedRequest = [];
  myWallet=0;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.route.params.subscribe(params => {
      this.franchiseID = params['id'];
    });
  }

  ngOnInit() {
    console.log(this.franchiseID)
    this.tabChanged(0)
    this.callApiToMyDetails();
  }

  tabChanged(event: any){
    if (event === 2) {
      console.log("event call 2");
      let data = {
        franchiseId: this.franchiseID,
      };
      this.userService.fetchParticularFranchiseBankDetails(data).subscribe({
        next: (res: any) => {
          console.log(res.result);
          this.bankDetails = res.result;
        },
        error: (error) => {
          this.toastr.warning(error.error.message);
        },
      });
    } else if (event === 0) {
      let data = {
        userId: this.franchiseID
      }
      this.userService.paymentRequestForSho(data).subscribe({
        next: (res: any) => {
          console.log(res.paymentRequests)
          this.franchiseHistory = res.paymentRequests;
        },
        error: (error) => {
          console.log(error.error.message)
        }
      })
    }
    else if(event === 1){
      let data = {
        userId: this.franchiseID
      }
      this.userService.fetchPaymentApprovedForAll(data).subscribe({
        next: (res: any) => {
          console.log(res)
          this.approvedRequest = res.paymentApprovals;
        },
        error: (error) => {
          console.log(error.error.message)
        }
      })
    }
  }

  approved(id: any) {

    let config: MatDialogConfig = {
       panelClass: 'requsetApprovedDialogClass'
    };
    const dialogRef = this.dialog.open(ConfirmApprovedComponent, config);


      dialogRef.componentInstance.okClicked.subscribe(() => {
        let data = {
          id:id
        }
          this.userService.paymentApprovedForFranchise(data).subscribe({
            next:(res:any)=>{
              this.toastr.success(res.message)
              this.tabChanged(0)
            },
            error:(err=>{
              this.toastr.warning(err.error.message)
            })
          })

        
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log("Closed");
    });

  }

  callApiToMyDetails(){
    let data = {
      franchiseId : this.franchiseID
    }
    this.userService.fetchParticularFranchiseDetails(data).subscribe({
      next:(res:any)=>{
        console.log(res.franchise.franchiseWallet)
        this.myWallet = res.franchise.franchiseWallet;
      },
      error:(err=>{
        console.log(err.error.message)
      })
    })
  }

}
