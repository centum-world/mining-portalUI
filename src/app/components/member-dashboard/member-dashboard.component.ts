import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-member-dashboard",
  templateUrl: "./member-dashboard.component.html",
  styleUrls: ["./member-dashboard.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class MemberDashboardComponent implements OnInit {
  profileDetails: boolean = false;

  myTeamDetails: any;
  memberEachDayWallet: any;
  memberTotalWalletOfEachMonth: any;
  memberWithdrawalHistoy: any;
  memberTotalWithdrawalAmount: any;
  memberRequest: any;

  bankDetails = {
    holder_name: "",
    account_no: "",
    ifsc_code: "",
    branch_name: "",
    bank_name: "",
  };
  memberRefferalId: any;
  memberRefferalIdToPartner: any;
  displayMemberRefferalId = "";
  displayMemberRefferalIdToPartner: any;
  withdrawAmount: any;
  displayUserId: any;
  serviceCharge: any;
  paidAmount: any;

  partnerDetailsIsActiveOrNot = [];
  partnerStatus: any;
  partnerLiquidity: any;
  partner_month_count: any;
  partnerName: "";
  partnerDop: "";
  partner_userid: "";
  memberWithdrawalHistoryArray = [];
  indexOfLastPayment: any;
  lastPayOutAmount: any;
  lastPayOutMonth: any;

  memberProfilePopupModalDetails: any;
  monthlyPayment: any;
  perDayAmount: any;

  profilePopup = {
    email: "",
    name: "",
    address: "",
    state: "",
    designation: "",
    qualification: "",
    exp: "",
    gender: "",
    dob: "",
    password: "",
    phone: "",
    salary: "",
    doj: "",
    userid: "",
    reffered_id: "",
    refferal_id: "",
  };

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.displayUserId = localStorage.getItem("userdetail");
    let data = {
      m_userid: localStorage.getItem("userdetail"),
    };
    this.userService.memberRefferalId(data).subscribe((response: any) => {
      if (response) {
        this.memberRefferalId = Object.values(response);
        this.displayMemberRefferalId = this.memberRefferalId[1][0].reffer_id;
      } else {
        // console.log("error");
      }
    });

    let myteamwithpartner = {
      p_reffered_id: localStorage.getItem("mrefferid"),
    };

    this.userService
      .useRefferalIdOfMemberToFetchMiningPartner(myteamwithpartner)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.memberRefferalIdToPartner = Object.values(response.data);
          }
        },
        error: (error) => {
          this.toastr.error("Something Went Wrong", "Error");
        },
      });

    this.myTeamDetailsInPopup();
    this.callApiMemberWalletDepositeDaily();
    this.callApiMemberTotalWalletofMonth();
    this.callApiMemberWithdrawalHistory();
    this.callApiMemberTotalWithdrawal();
    this.callApiMemberWithdrawalRequest();
    this.memberProfileDataPopup();
  }

  myTeamDetailsInPopup() {
    let myteam = {
      m_refferid: localStorage.getItem("mrefferid"),
    };
    this.userService.memberMyTeam(myteam).subscribe({
      next: (response: any) => {
        if (response) {
          this.myTeamDetails = Object.values(response.data);
        }
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong", "Error");
      },
    });
  }

  memberDetails() {
    this.profileDetails = true;
  }

  addMemberBankDetails() {
    let data = {
      user_id: localStorage.getItem("userdetail"),
      holder_name: this.bankDetails.holder_name,
      account_no: this.bankDetails.account_no,
      ifsc_code: this.bankDetails.ifsc_code,
      branch_name: this.bankDetails.branch_name,
      bank_name: this.bankDetails.bank_name,
    };

    this.userService.addMemberBankDetails(data).subscribe({
      next: (response) => {
        if (response) {
          this.toastr.success("Bank Added Successfully", "Success");
        }
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong", "Error");
      },
    });
  }

  callApiMemberWalletDepositeDaily() {
    let data = {
      m_userid: localStorage.getItem("userdetail"),
    };
    this.userService.memberWalletDepositeEachDay(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.memberEachDayWallet = Object.values(response.data);
        }
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong", "Error");
      },
    });
  }

  callApiMemberTotalWalletofMonth() {
    let data = {
      m_userid: localStorage.getItem("userdetail"),
    };
    this.userService.memberTotalWalletOfAMonth(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.memberTotalWalletOfEachMonth =
            response.data[0].sumOfMemberWallet;
        }
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong", "Error");
      },
    });
  }

  callApiMemberWithdrawalHistory() {
    let data = {
      m_userid: localStorage.getItem("userdetail"),
    };
    this.userService.memberWithdrawalApproved(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.memberWithdrawalHistoy = Object.values(response.data);
        }
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong", "Error");
      },
    });
  }

  callApiMemberTotalWithdrawal() {
    let data = {
      m_userid: localStorage.getItem("userdetail"),
    };
    this.userService.memberTotalWithdrawaHistoty(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.displayMemberRefferalIdToPartner = Object.values(response.data);
          this.withdrawAmount =
            this.displayMemberRefferalIdToPartner[0].sumOfMemberWallet;
          this.serviceCharge = (this.withdrawAmount * 5) / 100;
          this.paidAmount = this.withdrawAmount - this.serviceCharge;
        }
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong", "Error");
      },
    });
  }

  callApiMemberWithdrawalRequest() {
    let data = {
      m_userid: localStorage.getItem("userdetail"),
    };
    this.userService.memberWithdrawalRequstInMemberPortal(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.memberRequest = Object.values(response.data);
        }
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong ", "Error");
      },
    });
  }

  //fetchPartnerDetails(data.p_userid)
  fetchPartnerDetails(id) {
    this.partner_userid = id;
    let data = {
      p_userid: id,
    };
    this.userService.fetchPartnerDetailsFromMember(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.partnerDetailsIsActiveOrNot = Object.values(response.data);
          this.partnerStatus =
            this.partnerDetailsIsActiveOrNot[0].partner_status;
          this.partnerLiquidity =
            this.partnerDetailsIsActiveOrNot[0].p_liquidity;
          this.partnerDop = this.partnerDetailsIsActiveOrNot[0].p_dop;
          this.partner_month_count =
            this.partnerDetailsIsActiveOrNot[0].month_count;
          this.partnerName = this.partnerDetailsIsActiveOrNot[0].p_name;
        }
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong ", "Error");
      },
    });

    let lastPayout = {
      m_userid: id,
    };
    this.userService.memberLastPayout(lastPayout).subscribe({
      next: (resposne: any) => {
        if (resposne) {
          this.memberWithdrawalHistoryArray = Object.values(resposne.data);
          this.indexOfLastPayment = this.memberWithdrawalHistoryArray.length;
          if (this.indexOfLastPayment > 0) {
            this.lastPayOutAmount =
              this.memberWithdrawalHistoryArray[
                this.indexOfLastPayment - 1
              ].member_wallet;
            this.lastPayOutMonth =
              this.memberWithdrawalHistoryArray[
                this.indexOfLastPayment - 1
              ].approve_date;
          }
          if (this.indexOfLastPayment === 0) {
            this.lastPayOutAmount = null;
            this.lastPayOutMonth = null;
          }
        }
      },
    });
  }
  // member profile details in pop up modal
  memberProfileDataPopup() {
    let memberIdDetails = localStorage.getItem("userdetail");
    let data = {
      m_userid: memberIdDetails,
    };
    this.userService.fetchMemberPortalDetails(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.memberProfilePopupModalDetails = Object.values(response.data);
          this.profilePopup.name =
            this.memberProfilePopupModalDetails[0].m_name;
          this.profilePopup.phone =
            this.memberProfilePopupModalDetails[0].m_phone;
          this.profilePopup.address =
            this.memberProfilePopupModalDetails[0].m_add;
          this.profilePopup.email =
            this.memberProfilePopupModalDetails[0].m_email;
          this.profilePopup.designation =
            this.memberProfilePopupModalDetails[0].m_designation;
          this.profilePopup.qualification =
            this.memberProfilePopupModalDetails[0].m_quali;
          this.profilePopup.gender =
            this.memberProfilePopupModalDetails[0].m_gender;
          this.profilePopup.exp = this.memberProfilePopupModalDetails[0].m_exp;
          this.profilePopup.dob = this.datePipe.transform(
            this.memberProfilePopupModalDetails[0].m_dob,
            "yyyy-MM-dd"
          );
          this.profilePopup.password =
            this.memberProfilePopupModalDetails[0].m_password;
          this.profilePopup.state =
            this.memberProfilePopupModalDetails[0].m_state;
          this.profilePopup.salary =
            this.memberProfilePopupModalDetails[0].m_salary;
          this.profilePopup.doj = this.memberProfilePopupModalDetails[0].m_doj;
          this.profilePopup.userid =
            this.memberProfilePopupModalDetails[0].m_userid;
          this.profilePopup.reffered_id =
            this.memberProfilePopupModalDetails[0].m_refferid;
          this.profilePopup.refferal_id =
            this.memberProfilePopupModalDetails[0].reffer_id;
        }
      },
      error: (error) => {
        this.toastr.error("Something went wrong", "Error");
      },
    });
  }

  fetchPartnerLiquidity(id) {
    let lequidity = "";
    let data = {
      p_userid: id,
    };
    this.userService.fetchPartnerLiquidity(data).subscribe({
      next: (response: any) => {
        lequidity = response.data[0].p_liquidity;
        if (parseInt(lequidity) === 600000) {
          this.monthlyPayment = 11000;
          this.perDayAmount = 366;
        }
        if (parseInt(lequidity) === 300000) {
          this.monthlyPayment = 5500;
          this.perDayAmount = 183;
        }
        if (parseInt(lequidity) === 200000) {
          this.monthlyPayment = 3700;
          this.perDayAmount = 123;
        }
        if (parseInt(lequidity) === 100000) {
          this.monthlyPayment = 1850;
          this.perDayAmount = 61;
        }
      },
      error: (error) => {
        this.toastr.error("Something went wrong", "Error");
      },
    });
  }

  logOut() {
    localStorage.removeItem("token");
  }
}
