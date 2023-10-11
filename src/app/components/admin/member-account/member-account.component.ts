import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { MatDialogConfig } from '@angular/material';
import { ConfirmApprovedComponent } from '../dialog/confirm-approved/confirm-approved.component';

@Component({
  selector: 'app-member-account',
  templateUrl: './member-account.component.html',
  styleUrls: ['./member-account.component.css']
})
export class MemberAccountComponent implements OnInit {

  memberID: string;
  bankDetails = [];
  memberRequestHistory = [];
  approvedRequest = [];
  memberWallet=0;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.route.params.subscribe(params => {
      this.memberID = params['id']; // Retrieve parameter 1
      console.log(this.memberID);
    });
  }

  ngOnInit() {
    console.log(this.memberID)
    this.tabChanged(0);
    this.getMemberDetails()

  }
  getMemberDetails(){
    let data ={
      m_userid: this.memberID
    }
    this.userService.fetchMemberPortalDetails(data).subscribe({
      next:(res:any)=>{
        console.log(res.data[0].member_wallet)
        this.memberWallet = res.data[0].member_wallet
      },
      error:(err=>{
        console.log(err.error.message)
      })
    })
  }

  tabChanged(event: any) {
    if (event === 2) {
      console.log("event call 2");
      let data = {
        user_id: this.memberID
      }
      this.userService.fetchMemberBankDetails(data).subscribe({
        next: (res: any) => {
           console.log(res.data);
           this.bankDetails = res.data;
        },
        error: (error) => {
          this.toastr.warning(error.error.message)
        }
      })

    } else if (event === 0) {
      let data = {
        m_userid: this.memberID
      }
      this.userService.fetchParticularMemberWithdrawalRequest(data).subscribe({
        next: (res: any) => {
          console.log(res.data)
          this.memberRequestHistory = res.data;
        },
        error: (error) => {
          console.log(error.error.message)
        }
      })
    }else if(event === 1){
      let data = {
        m_userid: this.memberID
      }
      this.userService.fetchParticularMemberApprovedWithdrawalHistory(data).subscribe({
        next: (res: any) => {
          console.log(res.memberWithdrawalHistory)
           this.approvedRequest = res.memberWithdrawalHistory;
        },
        error: (error) => {
          console.log(error.error.message)
        }
      })
    }


  }

  approved(id: any, m_userid:any) {

    let config: MatDialogConfig = {
       panelClass: 'requsetApprovedDialogClass'
    };
    const dialogRef = this.dialog.open(ConfirmApprovedComponent, config);


      dialogRef.componentInstance.okClicked.subscribe(() => {
        let data = {
          m_userid:m_userid,
          id:id
        }

          this.userService.adminWillApprovedMemberRequest(data).subscribe({
            next:(res:any)=>{
              this.toastr.success(res.message)
              this.tabChanged(0)
              this.getMemberDetails();
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
