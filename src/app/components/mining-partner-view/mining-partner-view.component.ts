import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mining-partner-view',
  templateUrl: './mining-partner-view.component.html',
  styleUrls: ['./mining-partner-view.component.css']
})
export class MiningPartnerViewComponent implements OnInit {
  @Input() userid: string;
  id: string = 'day';
  confirmValue: boolean;
  confirmPayment: boolean;
  userStatus: any;
  pLiquidity: any;
  perDayAmountDropDown: any;
  februaryAmount:any;
  month_count: any;
  partnerDailyAmount: any;
  partnerWithdrawalRequestHistroy: any;
  partnerWithdrawalHistory = [];
  selectDate: string;
  partner_name:string;
  dateOfPartnr: any;
  parterLiquidity: any;
  lastPaymentOfIndex: any;
  lastPaymentDate: any;
  approveArray = [];
  perDayAmount: any;
  perDayAmounReal: any;
  consfirm: boolean;
  refferalAmount:any;
  constructor(private userService: UserService, private toastr: ToastrService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.findUserStatus();
    this.fetchPartnerDailyAmount();
    this.partnerWithdrawalRequest();
    this.withdrawalHistory();
    this.lastApproveDate();

  }

  perDayFunction() {
    if (this.perDayAmount === 'real') {
      this.perDayAmounReal = this.perDayAmountDropDown;
    }
    if (this.perDayAmount === 'zero') {
      this.perDayAmounReal = this.februaryAmount;
    }

    this.consfirm = confirm("Are you sure want to pay?");

    if (this.consfirm) {
      console.log(this.selectDate);
      
      let utcDate = new Date(this.selectDate);
      console.log(utcDate);
      
      let localTime = this.datePipe.transform(utcDate, 'yyyy-MM-dd HH:mm:ss', 'GMT+5:30');
      console.log(localTime);
      let data = {
        p_userid: this.userid,
        partnerdate: localTime,
        perDayAmounReal: this.perDayAmounReal,
        refferal_Amount:this.refferalAmount
      }
      
      //console.log(utcDate);
      
      this.userService.partnerPerDayAmountPaymentManually(data).subscribe({
        next: (result) => {
          if (result) {
            this.selectDate = '';
            this.toastr.success("Paid successfully", 'Success');
            this.ngOnInit();
          }
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
  }

  findUserStatus() {
    let data = {
      p_userid: this.userid
    }
    this.userService.isPartnerActiveManualFromAdmin(data).subscribe({
      next: (result: any) => {
        if (result) {
          console.log(result);
          
          this.userStatus = result.data[0].partner_status;
          this.pLiquidity = (result.data[0].p_liquidity);
          this.month_count = result.data[0].month_count;
          this.dateOfPartnr = result.data[0].p_dop;
          this.parterLiquidity = result.data[0].p_liquidity;
          this.partner_name = result.data[0].p_name;
          if (this.pLiquidity === 600000) {
            this.perDayAmountDropDown = 67500;
            this.februaryAmount = 63000;
            this.refferalAmount = 11000;
          }
          if (this.pLiquidity === 300000) {
            this.perDayAmountDropDown = 40500;
            this.februaryAmount = 37800;
            this.refferalAmount = 5500;
          }
          if (this.pLiquidity === 200000) {
            this.perDayAmountDropDown = 27000;
            this.februaryAmount = 25200;
            this.refferalAmount = 3700;
          }
          if (this.pLiquidity === 100000) {
            this.perDayAmountDropDown = 13500;
            this.februaryAmount= 12600;
            this.refferalAmount = 1850;
          }


        }
      },
      error: error => {
        // console.log(error);
      }

    })
  }

  fetchPartnerDailyAmount() {
    let data = {
      p_userid: this.userid
    }
    this.userService.partnerWalletDailyDataInAdmin(data).subscribe({
      next: (result: any) => {
        this.partnerDailyAmount = Object.values(result.data);
        // console.log(this.partnerDailyAmount);
        let index = this.partnerDailyAmount.length;

        for (let i = 0; i < index; i++) {
          let  serverTime = new Date(this.partnerDailyAmount[i].wallet_update_date);
          //console.log(serverTime);
          let indianTime = new Date(serverTime.getTime()-(3.5*60*60*1000));
          this.partnerDailyAmount[i].wallet_update_date = this.datePipe.transform(indianTime, 'yyyy-MM-dd HH:mm:ss');
          //this.partnerDailyAmount[i].wallet_update_date = this.datePipe.transform(this.partnerDailyAmount[i].wallet_update_date, 'yyyy-MM-dd HH:mm:ss', 'GMT+5:30');
          //this.partnerDailyAmount[i].wallet_update_date = this.datePipe.transform(serverTime, 'medium', 'en-IN');
        }
      },
      error: error => {
        // console.log(error);
      }
    })
  }



  partnerWithdrawalRequest() {
    let data = {
      p_userid: this.userid
    }
    this.userService.perticularPartnerWithdrawalRequest(data).subscribe({
      next: (result: any) => {
        this.partnerWithdrawalRequestHistroy = Object.values(result.data);
        console.log(this.partnerWithdrawalRequestHistroy);

      },
      error: error => {
        // console.log(error);
      }
    })
  }

  sendUserId(value, id) {


    let data = {
      p_userid: value,
      id: id
    }
    this.userService.approvedWithdrawalHistory(data).subscribe({
      next: response => {
        if (response) {
          this.ngOnInit();
          this.toastr.success('Request Approved', 'Success');
        }
      },
      error: error => {
        this.toastr.error('Something went wrong', 'Error');
      }
    }

    )

  }

  tabChange(ids) {
    this.id = ids;
    this.ngOnInit();
  }
  confirmModal() {
    this.confirmValue = confirm('Are you sure want to activate?');

    if (this.confirmValue) {
      let data = {
        p_userid: this.userid
      }
      this.userService.doactivatePartnerManualFromAdmin(data).subscribe({
        next: (result: any) => {
          this.ngOnInit();
        }
      })
    } else {
      // console.log("NO");
    }
  }

  withdrawalHistory() {
    let data = {
      p_userid: this.userid
    }
    this.userService.perticularPartnerWithdrawalHistory(data).subscribe({
      next: (result: any) => {
        this.partnerWithdrawalHistory = Object.values(result.data);

      },
      error: error => {
        // console.log(error);
      }
    })
  }
  lastApproveDate() {
    let data = {
      p_userid: this.userid
    }
    this.userService.partnerLastApproveDate(data).subscribe({
      next: (result: any) => {
        this.approveArray = Object.values(result.data);
        this.lastPaymentOfIndex = this.approveArray.length;
        this.lastPaymentDate = this.approveArray[this.lastPaymentOfIndex - 1].approve_date;
        console.log(this.lastPaymentDate);
      }
    })
  }

}
