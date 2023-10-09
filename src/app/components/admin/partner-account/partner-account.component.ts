import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { MatDialogConfig } from '@angular/material';
import { ConfirmApprovedComponent } from '../dialog/confirm-approved/confirm-approved.component';

@Component({
  selector: 'app-partner-account',
  templateUrl: './partner-account.component.html',
  styleUrls: ['./partner-account.component.css']
})
export class PartnerAccountComponent implements OnInit {

  partnerID: string;
  bankDetails = [];
  partnerRequestHistory = [];
  approvedRequest = [];
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.route.params.subscribe(params => {
      this.partnerID = params['id']; // Retrieve parameter 1
      console.log(this.partnerID);
    });
  }

  ngOnInit() {
    console.log(this.partnerID)
    this.tabChanged(0);
  }

  tabChanged(event: any) {
    if (event === 2) {
      console.log("event call 2");
      let data = {
        user_id: this.partnerID
      }
      this.userService.fetchMiningPartnerBankDetails(data).subscribe({
        next: (res: any) => {
          // console.log(res.data);
           this.bankDetails = res.data;
        },
        error: (error) => {
          this.toastr.warning(error.error.message)
        }
      })

    } else if (event === 0) {
      let data = {
        p_userid: this.partnerID
      }
      this.userService.perticularPartnerWithdrawalRequest(data).subscribe({
        next: (res: any) => {
          console.log(res.data)
          this.partnerRequestHistory = res.data;
        },
        error: (error) => {
          console.log(error.error.message)
        }
      })
    }else if(event === 1){
      let data = {
        p_userid: this.partnerID
      }
      this.userService.perticularPartnerWithdrawalHistory(data).subscribe({
        next: (res: any) => {
          console.log(res.data)
           this.approvedRequest = res.data;
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
          p_userid:this.partnerID,
          id:id
        }
          this.userService.approvedWithdrawalHistory(data).subscribe({
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
