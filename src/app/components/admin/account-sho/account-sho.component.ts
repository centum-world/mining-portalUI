import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { MatDialogConfig } from '@angular/material';
import { ConfirmApprovedComponent } from '../dialog/confirm-approved/confirm-approved.component';

@Component({
  selector: 'app-account-sho',
  templateUrl: './account-sho.component.html',
  styleUrls: ['./account-sho.component.css']
})
export class AccountShoComponent implements OnInit {
  shoID: string;
  bankDetails = [];
  shoRequestHistory = [];
  approvedRequest = [];
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.route.params.subscribe(params => {
      this.shoID = params['id']; // Retrieve parameter 1
      console.log(this.shoID);
    });
  }

  ngOnInit() {
    console.log(this.shoID)
    this.tabChanged(0);
  }

  tabChanged(event: any) {
    if (event === 2) {
      console.log("event call 2")
      let data = {
        userId: this.shoID
      }
      this.userService.fetchStateBankDetails(data).subscribe({
        next: (res: any) => {
          console.log(res.result)
          this.bankDetails = res.result
        },
        error: (error) => {
          this.toastr.warning(error.error.message)
        }
      })

    } else if (event === 0) {
      let data = {
        userId: this.shoID
      }
      this.userService.paymentRequestForSho(data).subscribe({
        next: (res: any) => {
          console.log(res.paymentRequests)
          this.shoRequestHistory = res.paymentRequests;
        },
        error: (error) => {
          console.log(error.error.message)
        }
      })
    }else if(event === 1){
      let data = {
        userId: this.shoID
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
          this.userService.paymentApprovedForSho(data).subscribe({
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

}
