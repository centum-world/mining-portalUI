import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

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
  month_count: any;
  partnerDailyAmount: any;
  partnerWithdrawalRequestHistroy: any;
  partnerWithdrawalHistory = [];
  selectDate: any;
  dateOfPartnr: any;
  parterLiquidity: any;
  lastPaymentOfIndex: any;
  lastPaymentDate: any;
  approveArray = [];
  perDayAmount: any;
  perDayAmounReal: any;
  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.findUserStatus();
    this.fetchPartnerDailyAmount();
    this.partnerWithdrawalRequest();
    this.withdrawalHistory();
    this.lastApproveDate();

  }

  perDayFunction() {
    if (this.perDayAmount === 'real') {
      this.perDayAmounReal = this.pLiquidity;
    }
    if (this.perDayAmount === 'zero') {
      this.perDayAmounReal = 0;
    }
    let data = {
      p_userid: this.userid,
      partnerdate: this.selectDate,
      perDayAmounReal: this.perDayAmounReal
    }
    this.userService.partnerPerDayAmountPaymentManually(data).subscribe({
      next: (result) => {
        if (result) {
          this.selectDate = '';
          this.ngOnInit();
          this.toastr.success("Paid successfully", 'Success')
        }
      },
      error: error => {
        this.toastr.warning("Select date", 'warning');
      }
    })
  }

  findUserStatus() {
    let data = {
      p_userid: this.userid
    }
    this.userService.isPartnerActiveManualFromAdmin(data).subscribe({
      next: (result: any) => {
        if (result) {
          this.userStatus = result.data[0].partner_status;
          this.pLiquidity = (result.data[0].p_liquidity / 20000);
          this.month_count = result.data[0].month_count;
          this.dateOfPartnr = result.data[0].p_dop;
          this.parterLiquidity = result.data[0].p_liquidity;
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

      },
      error: error => {
        // console.log(error);
      }
    })
  }

  sendUserId(value) {


    let data = {
      p_userid: value
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
