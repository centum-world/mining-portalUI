import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { AuthServiceService } from 'src/app/serviceAuth/auth-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-mining-dashboard',
  templateUrl: './mining-dashboard.component.html',
  styleUrls: ['./mining-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MiningDashboardComponent implements OnInit {

  view_detail: boolean = false;
  myMiningTeamDetails: any;
  amount1: number;
  amountNumber: number;
  walletAndDate: any;
  dispalyWalletAndDate: any;
  totalPartnerWalletAmount: any;
  dailyWalletAmountHistory: any;
  partnerWithdrawalSuccessHistoryList = [];
  partnerTotalWithdrawal: any;
  totalAmount: any;
  partnerWithdrawalRequestData:any;
  userStatus: any;
  month_count: any;
  dateOfPartner: any;
  partnerLiquidity: any;
  partnerLastPayment: any;
  partnerLastPaymentDate: any;
  approveArray = [];
  lastPaymentOfIndex: any;
  lastPaymentDate: any;
  partnerRefferalParDayAmont=[];
  monthlyPayout :any;
  partnerUserName:any;
  myTeamUserStatus:any;
  myTeamMonth_count:any;
  myTeamDateOfPartner:any;
  myTeamPartnerLiquidity:any;
  myTeamPartnerUserName:any;
  myTeamUserid:any;
  refferalApprovedArray = [];
  lastRefferalOfIndex:any;
  refferalMonthlyPayout:any;
  refferalLastPayout:any;

  reqestHistoryOfpartnerArray = [];
  successWithdrawal = [];
  options = {

  }
  public bankDetails = {
    holder_name: '',
    account_no: '',
    ifsc_code: '',
    branch_name: '',
    bank_name: '',
  }
  refferID: string = '';
  partnerId: string = '';
  constructor(
    private userService: UserService,
    private authService: AuthServiceService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {

    this.refferID = localStorage.getItem('prefferid');
    this.partnerId = localStorage.getItem('partnerdetails');
    this.miningPartnerRefferTeam();
    this.amount1 = Number(localStorage.getItem('pliquidity'));
    this.amountReceive(this.amount1);
    this.fetchPartnerWelletDate();
    this.partnerWalletDailyData();
    this.partnerSuccessHistory();
    this.partnerTotalWithdrawalAmount();
    this.partnerWithdrawalRequest();
    this.paymentDetails();
    this.lastApproveDate();
    this.partnerRrefferalPerday();
    this.refferalWithdrawalRequest();
    this.refferalWithdrawalSuccess();
  }


  partnerWalletDailyData() {
    let data = {
      p_userid: localStorage.getItem('partnerdetails')
    }
    this.userService.partnerWalletDailyData(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.dailyWalletAmountHistory = Object.values(response.data);
        }
      },
      error: error => {
        this.toastr.error('Something Went Wrong 1', 'Error');
      }
    })
  }

  fetchPartnerWalletAndUpdate() {
    let data = {
      p_userid: localStorage.getItem('partnerdetails')
    }
    this.userService.fetchMiningPartnerWalletAndUpdate(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.toastr.success(response.message);
        }
      },
      error: error => {
        this.toastr.warning('Account is not Activated!', 'Warning');
      }
    })


  }

  fetchPartnerWelletDate() {
    let data = {
      p_userid: localStorage.getItem('partnerdetails')
    }
    this.userService.fetchMiningPartnerWallet(data).subscribe({
      next: (response: any) => {
        if (response) {
          console.log(response.results)
          // this.walletAndDate = Object.values(response.data);

          // this.totalPartnerWalletAmount = this.walletAndDate[0].partner_wallet;
          this.totalPartnerWalletAmount = response.results;
          
        }
      },
      error: error => {
        this.toastr.error('Something Went Wrong2 ', 'Error');
      }
    })
  }

  //partner success history
  partnerSuccessHistory() {
    let data = {
      p_userid: localStorage.getItem('partnerdetails')
    }
    this.userService.partnerWithdrawalSuccessHistroy(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.partnerWithdrawalSuccessHistoryList = Object.values(response.data);
          this.partnerLastPayment = this.partnerWithdrawalSuccessHistoryList.length;
          // console.log(this.partnerLastPayment);
          if(this.partnerLastPayment > 0){
            this.monthlyPayout= this.partnerWithdrawalSuccessHistoryList[this.partnerLastPayment-1].partner_wallet;
          }
          else{
            this.monthlyPayout= null;
          }
         
          
        }
      },
      error: error => {
        this.toastr.error('Something Went Wrong 3', 'Error');
      }
    })
  }
  partnerTotalWithdrawalAmount() {
    let data = {
      p_userid: localStorage.getItem('partnerdetails')
    }
    this.userService.partnerTotalWithdrawalHistory(data).subscribe({
      next: (response: any) => {
        if (response) {
          // this.partnerTotalWithdrawal = Object.values(response.data);
          // this.totalAmount = this.partnerTotalWithdrawal[0].sumOfPartnerWallet;
          this.totalAmount = response.results
          console.log(this.totalAmount);
          
        }
      },
      error: error => {
        this.toastr.error('Something Went Wrong 4', 'Error');
      }
    })
  }

  // partnerRefferalPerDayWallet(){
  //   let data={

  //   }
  // }

  mining_profile_details(message_string) {
    this.view_detail = true;
  }

  amountReceive(amount1) {
    this.amountNumber = amount1;

    this.options = {
      "key": "rzp_test_z3j9CAkbEUynHV", // Enter the Key ID generated from the Dashboard
      "amount": this.amount1 * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "CENTUM WORLD",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
      "prefill": {
        "name": "CENTUM WORLD",
        "email": "gaurav.kumar@example.com",
        "contact": "9999999999"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
  }
  miningPartnerRefferTeam() {
    let myteam = {
      p_reffered_id: localStorage.getItem('prefferid')
    }
    this.userService.miningPartnerTeam(myteam).subscribe({
      next: (response: any) => {
        if (response) {
          this.myMiningTeamDetails = Object.values(response.data);
        }
      },
      error: error => {
        this.toastr.error('Something went Wrong5 ', 'Error');
      }
    })
  }

  addBankDetails() {
    let data = {
      user_id: localStorage.getItem('partnerdetails'),
      holder_name: this.bankDetails.holder_name,
      account_no: this.bankDetails.account_no,
      ifsc_code: this.bankDetails.ifsc_code,
      branch_name: this.bankDetails.branch_name,
      bank_name: this.bankDetails.bank_name

    }

    this.userService.addMiningPartnerBankDetails(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.toastr.success(response.message);
        }
      },
      error: error => {
        this.toastr.error('Something Went Wrong 6', 'Error');
      }
    })

  }

  partnerWithdrawalRequest() {
    let data = {
      p_userid: localStorage.getItem('partnerdetails')
    }
    this.userService.parterWithdrawalRequestFromPartnerPortal(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.partnerWithdrawalRequestData = Object.values(response.data);
          console.log(this.partnerWithdrawalRequestData);
          
        }
      },
      error: error => {
        this.toastr.error('Something Went Wrong7 ', 'Error');
      }
    })
  }


  paymentDetails() {
    let data = {
      p_userid: this.partnerId
    }
    this.userService.isPartnerActiveFromPartner(data).subscribe({
      next: (result: any) => {
        console.log(result.data);
        
        this.userStatus = result.data[0].partner_status;
        this.month_count = result.data[0].month_count;
        this.dateOfPartner = result.data[0].p_dop;
        this.partnerLiquidity = result.data[0].p_liquidity;
        this.partnerUserName = result.data[0].p_name;
      },
      error: error => {
        this.toastr.error('Something Went Wrong ', 'Error');
      }
    })
  }


  rzp1;
  pay() {
    this.rzp1 = new this.authService.nativeWindow.Razorpay(this.options);
    this.rzp1.open();
  }

  logOut() {
    localStorage.removeItem('token');
  }

  lastApproveDate() {
    let data = {
      p_userid: this.partnerId
    }
    this.userService.partnerLastApproveDate(data).subscribe({
      next: (result: any) => {
        this.approveArray = Object.values(result.data);
        this.lastPaymentOfIndex = this.approveArray.length;
        if(this.lastPaymentOfIndex > 0){
          this.lastPaymentDate = this.approveArray[this.lastPaymentOfIndex - 1].approve_date;
        }else{
          this.lastPaymentDate = null;
        }
        
      },
      error: error => {
        this.toastr.error('Something Went Wrong ', 'Error');
      }
    })
  }

  partnerRrefferalPerday(){
    let data = {
      p_userid: this.partnerId
    }
    this.userService.partnerRrefferalPerdayWalletHistory(data).subscribe({
      next:(result:any)=>{
        this.partnerRefferalParDayAmont = Object.values(result.data);
        console.log(this.partnerRefferalParDayAmont)
      },
      error: error => {
        this.toastr.error('Something Went Wrong ', 'Error');
      }
    })
  }

  myTeamPaymentDetails(id){
    console.log(id);
    this.myTeamUserid = id;
    let data = {
      p_userid:id
    }
    this.userService.isPartnerActiveFromPartner(data).subscribe({
      next: (result: any) => {
        console.log(result.data);
        
        this.myTeamUserStatus = result.data[0].partner_status;
        this.myTeamMonth_count = result.data[0].month_count;
        this.myTeamDateOfPartner = result.data[0].p_dop;
        this.myTeamPartnerLiquidity = result.data[0].p_liquidity;
        this.myTeamPartnerUserName = result.data[0].p_name;
      },
      error: error => {
        this.toastr.error('Something Went Wrong ', 'Error');
      }
    })

    this.userService.partnerRefferalLastPayout(data).subscribe({
      next: (result: any) => {
        this.refferalApprovedArray = Object.values(result.data);
        this.lastRefferalOfIndex = this.refferalApprovedArray.length;
        console.log(this.lastRefferalOfIndex);
        //console.log(this.refferalApprovedArray)
        if(this.lastRefferalOfIndex > 0){
          this.refferalLastPayout = this.refferalApprovedArray[this.lastRefferalOfIndex - 1].approve_date;
         this.refferalMonthlyPayout = this.refferalApprovedArray[this.lastRefferalOfIndex - 1].partner_wallet;
        }else{
          this.refferalLastPayout=null;
          this.refferalMonthlyPayout=null;
        }
        
        
      },
      error: error => {
        this.toastr.error('Something Went Wrong ', 'Error');
      }
    })
  }

  refferalWithdrawalRequest(){
    let data = {
      p_userid: this.partnerId
    }

    this.userService.refferWithdrawalRequestFromPartner(data).subscribe({
      next:(results:any)=>{
        this.reqestHistoryOfpartnerArray =  Object.values(results.data);
        console.log(this.reqestHistoryOfpartnerArray);
      },
      error:error=>{
        this.toastr.error('Something Went Wrong ', 'Error');
      }
    })
  }

  refferalWithdrawalSuccess(){
    let data = {
      p_userid: this.partnerId
    }

    this.userService.refferWithdrawalSuccessFromPartner(data).subscribe({
      next:(results:any)=>{
        this.successWithdrawal =  Object.values(results.data);
        console.log(this.successWithdrawal);
      },
      error:error=>{
        this.toastr.error('Something Went Wrong ', 'Error');
      }
    })
  }
  

}
