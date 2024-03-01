import { Component, OnInit, Inject } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { AuthServiceService } from "src/app/serviceAuth/auth-service.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogConfig } from "@angular/material";
import { RigIdComponent } from "../dialog/rig-id/rig-id.component";
import { RigAccountComponent } from "../dialog/rig-account/rig-account.component";

@Component({
  selector: "app-mining-cards",
  templateUrl: "./mining-cards.component.html",
  styleUrls: ["./mining-cards.component.css"],
})
export class MiningCardsComponent implements OnInit {
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
  partnerWithdrawalRequestData: any;
  userStatus: any;
  month_count: any;
  dateOfPartner: any;
  partnerLiquidity: any;
  partnerLastPayment: any;
  partnerLastPaymentDate: any;
  approveArray = [];
  lastPaymentOfIndex: any;
  lastPaymentDate: any;
  partnerRefferalParDayAmont = [];
  monthlyPayout: any;
  partnerUserName: any;
  myTeamUserStatus: any;
  myTeamMonth_count: any;
  myTeamDateOfPartner: any;
  myTeamPartnerLiquidity: any;
  myTeamPartnerUserName: any;
  myTeamUserid: any;
  refferalApprovedArray = [];
  lastRefferalOfIndex: any;
  refferalMonthlyPayout: any;
  refferalLastPayout: any;
  miningPartnerDetailsPopUp: any;

  reqestHistoryOfpartnerArray = [];
  successWithdrawal = [];
  monthlyAmount: any;
  perDayAmount: any;
  options = {};
  public viewBankDetails = {
    holder_name: "",
    account_no: "",
    ifsc_code: "",
    branch_name: "",
    bank_name: "",
  };
  public bankDetails = {
    holder_name: "",
    account_no: "",
    ifsc_code: "",
    branch_name: "",
    bank_name: "",
  };
  refferID: string = "";
  partnerId: string = "";
  partnerBankDetails = [];
  myQuery = "";
  partnerDetails: any;

  partnerProfileDetailsPopUP = {
    p_userid: "",
    p_name: "",
    p_phone: "",
    p_aadhar: "",
    p_email: "",
    p_address: "",
    p_state: "",
    p_nominee_name: "",
    p_nominee_aadhar: "",
    p_nominee_phone: "",
    p_dob: "",
    p_dop: "",
    // p_gender:'',
    p_reffered_id: "",
    p_refferal_id: "",
  };

  todayPayout:any;
  monthPayout:any;
  totalPayout:any;
  referralTodayPayout:any;
  referralMonthPayout:any;
  referralTotalPayout:any;
  constructor(
    private userService: UserService,
    private authService: AuthServiceService,
    private toastr: ToastrService,
    private router: Router,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.refferID = localStorage.getItem("prefferid");
    this.partnerId = localStorage.getItem("partnerdetails");
    this.miningPartnerRefferTeam();
    this.amount1 = Number(localStorage.getItem("pliquidity"));
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
    this.miningBankDetails();
    this.fetchMiningPartnerProfileDetails();
    this.callApiToFetchTodayMonthTotalPayout();
    this.callApiToFetchReferralTodayMonthTotalPayout();
  }

  partnerWalletDailyData() {
    let data = {
      p_userid: localStorage.getItem("partnerdetails"),
    };
    this.userService.partnerWalletDailyData(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.dailyWalletAmountHistory = Object.values(response.data);
        }
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong 1", "Error");
      },
    });
  }

  fetchPartnerWalletAndUpdate() {
    let data = {
      p_userid: localStorage.getItem("partnerdetails"),
    };
    this.userService.fetchMiningPartnerWalletAndUpdate(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.toastr.success(response.message);
        }
      },
      error: (error) => {
        this.toastr.warning("Account is not Activated!", "Warning");
      },
    });
  }

  fetchPartnerWelletDate() {
    let data = {
      p_userid: localStorage.getItem("partnerdetails"),
    };
    this.userService.fetchMiningPartnerWallet(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.totalPartnerWalletAmount = response.results;
        }
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong2 ", "Error");
      },
    });
  }

  //partner success history
  partnerSuccessHistory() {
    let data = {
      p_userid: localStorage.getItem("partnerdetails"),
    };
    this.userService.partnerWithdrawalSuccessHistroy(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.partnerWithdrawalSuccessHistoryList = Object.values(
            response.data
          );
          this.partnerLastPayment =
            this.partnerWithdrawalSuccessHistoryList.length;
          if (this.partnerLastPayment > 0) {
            this.monthlyPayout =
              this.partnerWithdrawalSuccessHistoryList[
                this.partnerLastPayment - 1
              ].partner_wallet;
          } else {
            this.monthlyPayout = null;
          }
        }
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong 3", "Error");
      },
    });
  }
  partnerTotalWithdrawalAmount() {
    let data = {
      p_userid: localStorage.getItem("partnerdetails"),
    };
    this.userService.partnerTotalWithdrawalHistory(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.totalAmount = response.results;
        }
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong 4", "Error");
      },
    });
  }

  mining_profile_details(message_string) {
    this.view_detail = true;
  }

  copyToClipboard() {
    const textToCopy = this.refferID;
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    this.toastr.success("Referral ID copied to clipboard!", "Success");
  }

  shareFunction() {
    const displayPartnerRefferalId = localStorage.getItem("prefferid");
    // const referralType = localStorage.getItem('userType');
    const message = `Check out this link: https://apps.centumworldrig.com/mininglogin and Referral type : Partner , Referral ID : ${displayPartnerRefferalId}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  }

  amountReceive(amount1) {
    this.amountNumber = amount1;

    this.options = {
      key: "rzp_test_z3j9CAkbEUynHV", // Enter the Key ID generated from the Dashboard
      amount: this.amount1 * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "CENTUM WORLD",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
      prefill: {
        name: "CENTUM WORLD",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
  }
  miningPartnerRefferTeam() {
    let myteam = {
      p_reffered_id: localStorage.getItem("prefferid"),
    };
    this.userService.miningPartnerTeam(myteam).subscribe({
      next: (response: any) => {
        if (response) {
          this.myMiningTeamDetails = Object.values(response.data);
        }
      },
      error: (error) => {
        this.toastr.error("Something went Wrong5 ", "Error");
      },
    });
  }

  addBankDetails() {
    let data = {
      user_id: localStorage.getItem("partnerdetails"),
      holder_name: this.bankDetails.holder_name,
      account_no: this.bankDetails.account_no,
      ifsc_code: this.bankDetails.ifsc_code,
      branch_name: this.bankDetails.branch_name,
      bank_name: this.bankDetails.bank_name,
    };

    this.userService.addMiningPartnerBankDetails(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.toastr.success(response.message);
          this.bankDetails.holder_name = "";
        }
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong 6", "Error");
      },
    });
  }

  partnerWithdrawalRequest() {
    let data = {
      p_userid: localStorage.getItem("partnerdetails"),
    };
    this.userService.parterWithdrawalRequestFromPartnerPortal(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.partnerWithdrawalRequestData = Object.values(response.data);
        }
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong7 ", "Error");
      },
    });
  }

  paymentDetails() {
    let data = {
      p_userid: this.partnerId,
    };
    this.userService.isPartnerActiveFromPartner(data).subscribe({
      next: (result: any) => {
        this.userStatus = result.data[0].partner_status;
        this.month_count = result.data[0].month_count;
        this.dateOfPartner = result.data[0].p_dop;
        this.partnerLiquidity = result.data[0].p_liquidity;
        this.partnerUserName = result.data[0].p_name;
        if (this.partnerLiquidity === 600000) {
          this.monthlyAmount = 67500;
          this.perDayAmount = 2250;
        }
        if (this.partnerLiquidity === 300000) {
          this.monthlyAmount = 40500;
          this.perDayAmount = 1350;
        }
        if (this.partnerLiquidity === 200000) {
          this.monthlyAmount = 27000;
          this.perDayAmount = 900;
        }
        if (this.partnerLiquidity === 100000) {
          this.monthlyAmount = 13500;
          this.perDayAmount = 450;
        }
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong ", "Error");
      },
    });
  }

  rzp1;
  pay() {
    this.rzp1 = new this.authService.nativeWindow.Razorpay(this.options);
    this.rzp1.open();
  }

  lastApproveDate() {
    let data = {
      p_userid: this.partnerId,
    };
    this.userService.partnerLastApproveDate(data).subscribe({
      next: (result: any) => {
        this.approveArray = Object.values(result.data);
        this.lastPaymentOfIndex = this.approveArray.length;
        if (this.lastPaymentOfIndex > 0) {
          this.lastPaymentDate =
            this.approveArray[this.lastPaymentOfIndex - 1].approve_date;
        } else {
          this.lastPaymentDate = null;
        }
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong ", "Error");
      },
    });
  }

  partnerRrefferalPerday() {
    let data = {
      p_userid: this.partnerId,
    };
    this.userService.partnerRrefferalPerdayWalletHistory(data).subscribe({
      next: (result: any) => {
        this.partnerRefferalParDayAmont = Object.values(result.data);
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong ", "Error");
      },
    });
  }

  myTeamPaymentDetails(id) {
    console.log(id);
    this.myTeamUserid = id;
    let data = {
      p_userid: id,
    };
    this.userService.isPartnerActiveFromPartner(data).subscribe({
      next: (result: any) => {
        this.myTeamUserStatus = result.data[0].partner_status;
        this.myTeamMonth_count = result.data[0].month_count;
        this.myTeamDateOfPartner = result.data[0].p_dop;
        this.myTeamPartnerLiquidity = result.data[0].p_liquidity;
        this.myTeamPartnerUserName = result.data[0].p_name;
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong ", "Error");
      },
    });

    this.userService.partnerRefferalLastPayout(data).subscribe({
      next: (result: any) => {
        this.refferalApprovedArray = Object.values(result.data);
        this.lastRefferalOfIndex = this.refferalApprovedArray.length;
        if (this.lastRefferalOfIndex > 0) {
          this.refferalLastPayout =
            this.refferalApprovedArray[
              this.lastRefferalOfIndex - 1
            ].approve_date;
          this.refferalMonthlyPayout =
            this.refferalApprovedArray[
              this.lastRefferalOfIndex - 1
            ].partner_wallet;
        } else {
          this.refferalLastPayout = null;
          this.refferalMonthlyPayout = null;
        }
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong ", "Error");
      },
    });
  }

  refferalWithdrawalRequest() {
    let data = {
      p_userid: this.partnerId,
    };

    this.userService.refferWithdrawalRequestFromPartner(data).subscribe({
      next: (results: any) => {
        this.reqestHistoryOfpartnerArray = Object.values(results.data);
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong ", "Error");
      },
    });
  }

  refferalWithdrawalSuccess() {
    let data = {
      p_userid: this.partnerId,
    };

    this.userService.refferWithdrawalSuccessFromPartner(data).subscribe({
      next: (results: any) => {
        this.successWithdrawal = Object.values(results.data);
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong ", "Error");
      },
    });
  }

  miningBankDetails() {
    let data = {
      user_id: localStorage.getItem("partnerdetails"),
    };
    this.userService
      .fetchMiningPartnerBankDetails(data)
      .subscribe((response: any) => {
        if (response) {
          this.partnerBankDetails = Object.values(response);
          if (this.partnerBankDetails[1].length > 0) {
            this.viewBankDetails.holder_name =
              this.partnerBankDetails[1][0].holder_name;

            this.viewBankDetails.account_no =
              this.partnerBankDetails[1][0].account_no;
            this.viewBankDetails.ifsc_code =
              this.partnerBankDetails[1][0].ifsc_code;
            this.viewBankDetails.branch_name =
              this.partnerBankDetails[1][0].branch_name;
            this.viewBankDetails.bank_name =
              this.partnerBankDetails[1][0].bank_name;
          }
        } else {
          // console.log("error");
        }
      });
  }

  //  profile details in popup

  fetchMiningPartnerProfileDetails() {
    let partnerIdDetails = localStorage.getItem("partnerdetails");
    let data = {
      p_userid: partnerIdDetails,
    };
    this.userService.fetchMiningPartnerProfileDetails(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.partnerDetails = Object.values(response.data);
          console.log(this.partnerDetails);
          this.partnerProfileDetailsPopUP.p_userid =
            this.partnerDetails[0].p_userid;
          this.partnerProfileDetailsPopUP.p_name =
            this.partnerDetails[0].p_name;
          this.partnerProfileDetailsPopUP.p_phone =
            this.partnerDetails[0].p_phone;
          this.partnerProfileDetailsPopUP.p_aadhar =
            this.partnerDetails[0].p_aadhar;
          this.partnerProfileDetailsPopUP.p_email =
            this.partnerDetails[0].p_email;
          this.partnerProfileDetailsPopUP.p_address =
            this.partnerDetails[0].p_address;
          //this.partnerProfileDetailsPopUP.p_gender = this.partnerDetails[0].p_gender;
          this.partnerProfileDetailsPopUP.p_state =
            this.partnerDetails[0].p_state;
          this.partnerProfileDetailsPopUP.p_nominee_name =
            this.partnerDetails[0].p_nominee_name;
          this.partnerProfileDetailsPopUP.p_nominee_aadhar =
            this.partnerDetails[0].p_nominee_aadhar;
          this.partnerProfileDetailsPopUP.p_nominee_phone =
            this.partnerDetails[0].p_nominee_phone;
          this.partnerProfileDetailsPopUP.p_dob = this.datePipe.transform(
            this.partnerDetails[0].p_dob,
            "yyyy-MM-dd"
          );
          this.partnerProfileDetailsPopUP.p_dop = this.datePipe.transform(
            this.partnerDetails[0].p_dop,
            "yyyy-MM-dd"
          );
          this.partnerProfileDetailsPopUP.p_reffered_id =
            this.partnerDetails[0].p_reffered_id;
          this.partnerProfileDetailsPopUP.p_refferal_id =
            this.partnerDetails[0].p_refferal_id;
        }
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong", "Error");
      },
    });
  }

  query() {
    let data = {
      p_userid: localStorage.getItem("partnerdetails"),
      query: this.myQuery,
    };
    this.userService.partnerHelpAndQuery(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.toastr.success("Query Submitted");
          this.myQuery = "";
        }
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong", "Error");
      },
    });
  }
  gotoAccount() {
    this.router.navigate(["/miningdashboard/account"]);
  }

  myteam() {
    this.router.navigate(["/miningdashboard/my-team"]);
  }
  withdrwalPage() {
    this.router.navigate(["/miningdashboard/withdraw"]);
  }
  referralPayout() {
    this.router.navigate(["/miningdashboard/referral-payout"]);
  }

  downloadBusinessModule() {
    const url = "../../../../assets/image/rig.pdf";
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.download = "business-module.pdf";
    link.click();
  }

  downloadPartnershipBond() {
    let partnerIdDetails = localStorage.getItem("partnerdetails");
    console.log(partnerIdDetails, 101);
    let data = {
      userId: partnerIdDetails,
    };
    console.log(data, 105);
    this.userService.fetchPartnerBond(data).subscribe({
      next: (res: any) => {
        console.log(res.data[0].bond);
        const bondData = res.data[0].bond;
        const pdfUrl = bondData;

        window.open(pdfUrl, "_blank");
      },
      error: (err) => {
        console.log(err.error.message);
        this.toastr.warning("!No Partnership bond Found");
      },
    });
  }

  openRigID(): void {
    let config: MatDialogConfig = {
      panelClass: "partnerRigDialogClass",
    };
    const dialogRef = this.dialog.open(RigIdComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  allRigAccount(): void {
    let config: MatDialogConfig = {
      panelClass: "partnerRigAccountDialogClass",
    };
    const dialogRef = this.dialog.open(RigAccountComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  callApiToFetchTodayMonthTotalPayout(){
    let currentdate = new Date();
    let year = currentdate.getFullYear().toString();
    let month = (currentdate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed, so add 1
    let day = currentdate.getDate().toString().padStart(2, "0");
    let formattedDate = `${year}-${month}-${day}`;

    let data = {
      partnerId:localStorage.getItem("partnerdetails"),
      currentDate:formattedDate
    };
    this.userService.apiToGetPartnerOwnPayoutTransactionTotal(data).subscribe({
      next: (res: any) => {
        console.log(res);
        this.totalPayout = res.TotalPayout;
        this.monthPayout = res.MonthPayout;
        this.todayPayout = res.TodaysPayout;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  callApiToFetchReferralTodayMonthTotalPayout(){
    let currentdate = new Date();
    let year = currentdate.getFullYear().toString();
    let month = (currentdate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed, so add 1
    let day = currentdate.getDate().toString().padStart(2, "0");
    let formattedDate = `${year}-${month}-${day}`;

    let data = {
      userid:localStorage.getItem("partnerdetails"),
      currentDate:formattedDate
    };
    this.userService.apiTofetchReferralPayoutTodayMonthTotalTransaction(data).subscribe({
      next: (res: any) => {
        console.log(res);
        this.referralTotalPayout = res.TotalPayout;
        this.referralMonthPayout = res.MonthPayout;
        this.referralTodayPayout = res.TodaysPayout;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  viewReferralPayoutList(){
    this.router.navigate(['/miningdashboard/referral-payout'])
  }
  viewTransactionHistoryList(){
    this.router.navigate(['/miningdashboard/transaction-history'])
  }
}
