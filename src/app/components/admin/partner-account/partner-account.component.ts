import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { MatDialogConfig } from '@angular/material';
import { ConfirmApprovedComponent } from '../dialog/confirm-approved/confirm-approved.component';
import { Router } from '@angular/router'

@Component({
  selector: 'app-partner-account',
  templateUrl: './partner-account.component.html',
  styleUrls: ['./partner-account.component.css']
})
export class PartnerAccountComponent implements OnInit {
  status:boolean;
  partnerID: string;
  bankDetails = [];
  partnerRequestHistory = [];
  approvedRequest = [];
  referralRequestHistory = [];
  apprvedHistory = [];
  perDayAmountDropDown = 0;
  februaryAmount = 0;
  refferalAmount = 0;
  paymentDate = null;
  perDayAmounReal = 0;
  partnerDetails = {
    dop:"",
    liquidity:0,
    monthComplete:0,
    lastPaymentDate:"",
    status: false
  }
  color = 'accent';
  checked = false;
  disabled = false;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.partnerID = params['id']; // Retrieve parameter 1
      console.log(this.partnerID);
    });
  }

  ngOnInit() {
    console.log(this.partnerID)
    this.tabChanged(0);
    this.referralTabChange(0);
    this.callApiToUserDetails();
  }
  onSlideToggleChange() {
  
      this.checked = !this.checked; // Toggle the checked state
      console.log('Slide toggle changed:', this.checked);
   
  }

  tabChanged(event: any) {
    if (event === 3) {
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
      
    } else if (event === 1) {
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
    }else if(event === 2){
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
    }else if(event === 0){
      let data = {
        userId: this.partnerID
      }
      this.userService.callApiToUniqepartnerDetails(data).subscribe({
        next:(res:any)=>{
          console.log(res.result[0])
          this.partnerDetails.dop = res.result[0].p_dop;
          this.partnerDetails.liquidity = res.result[0].p_liquidity;
          this.partnerDetails.monthComplete = res.result[0].month_count;
          this.partnerDetails.status = res.result[0].partner_status

          if(res.result[0].p_liquidity === 600000){
            this.perDayAmountDropDown = 67500;
            this.februaryAmount = 63000;
            this.refferalAmount = 11000;
          }else if(res.result[0].p_liquidity === 300000){
            this.perDayAmountDropDown = 40500;
            this.februaryAmount = 37800;
            this.refferalAmount = 5500
          }else if(res.result[0].p_liquidity === 200000){
            this.perDayAmountDropDown = 27000;
            this.februaryAmount = 25200;
            this.refferalAmount = 3700;
          }else if(res.result[0].p_liquidity === 100000){
            this.perDayAmountDropDown = 13500;
            this.februaryAmount = 12600;
            this.refferalAmount = 1850;
          }else if(res.result[0].p_liquidity === 1200000){
            this.perDayAmountDropDown = 135000;
            this.februaryAmount = 124000;
            this.refferalAmount = 22000;
          }

        },
        error:(err=>{
          console.log(err.error.message)
        })
      })
    }else if(event === 4){
      this.lastApproveDate();
    }
  }

  callApiToUserDetails(){
    let data = {
      p_userid : this.partnerID
    }
    this.userService.fetchPartnerDetailsForAdminUsingPartnerId(data).subscribe({
      next:(res:any)=>{
        this.status = res.data[0].partner_status;
      },
      error:(err=>{
        console.log(err.error.message)
      })
    })
  }

  onDateSelected(event:any){
    console.log(event.value)
    const formattedDate = this.formatDate(event.value);
    this.paymentDate = formattedDate

  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Month is zero-based
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  onSelectChange(event:any){
    console.log(event.value)
    this.perDayAmounReal = event.value;
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
              this.tabChanged(1)
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

  payNow(){
    console.log(this.paymentDate, this.perDayAmounReal, this.refferalAmount)
    let data = {
      p_userid: this.partnerID,
      partnerdate: this.paymentDate,
      perDayAmounReal: this.perDayAmounReal,
      refferal_Amount:this.refferalAmount
    }
    this.userService.partnerPerDayAmountPaymentManually(data).subscribe({
      next: (result:any) => {
       this.toastr.success(result.message)
      },
      error: error => {
        if (error.error.status === 409) {
          this.toastr.warning("Aready paid to this date!", 'Warning')
        }
        if (error.error.status === 422) {
          this.toastr.warning(error.error.message, 'Warning')
        }
      }
    })
  }

  lastApproveDate() {
    let approveArray = [];
    let data = {
      p_userid: this.partnerID
    }
    this.userService.partnerLastApproveDate(data).subscribe({
      next: (result: any) => {
        approveArray = Object.values(result.data);
        let lastPaymentOfIndex = approveArray.length;
        this.partnerDetails.lastPaymentDate = approveArray[lastPaymentOfIndex - 1].approve_date;
        console.log(this.partnerDetails.lastPaymentDate);
      }
    })
  }

  referralTabChange(event:any){
    console.log(event)
   
    if(event === 0){
      let data ={
        userId: this.partnerID
      }
      this.userService.partnerReferalRequst(data).subscribe({
        next:(res:any)=>{
          console.log(res.result)
          this.referralRequestHistory = res.result;
        },
        error:(err=>{
          console.log(err.error.message)
        })
      })
    }
    if(event === 1){
      let data ={
        userId: this.partnerID
      }
      this.userService.fetchPartnerReferralPayout(data).subscribe({
        next:(res:any)=>{
          console.log(res.result)
          this.apprvedHistory = res.result
        },
        error:(err=>{
          console.log(err.error.message)
        })
      })
    }
  }
  goBack(){
    this.router.navigate(['/dashboard/home'])
  }

  referralPayoutApproved(id:any){
    let data = {
      id:id
    }
    this.userService.partnerReferralApproved(data).subscribe({
      next:(res:any)=>{
        this.toastr.success(res.message)
        this.referralTabChange(0);
      },
      error:(err=>{
        console.log(err.error.message)
      })
    })
    
  }

}
