import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MemberProfileDetailsComponent } from '../modal/member-profile-details/member-profile-details.component';
import { MemberAddBankComponent } from '../modal/member-add-bank/member-add-bank.component';
import { MemberViewBankComponent } from '../modal/member-view-bank/member-view-bank.component';
import { MemberEditBankComponent } from '../modal/member-edit-bank/member-edit-bank.component';
@Component({
  selector: "app-member-card",
  templateUrl: "./member-card.component.html",
  styleUrls: ["./member-card.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class MemberCardComponent implements OnInit {
  profileDetails: boolean = false;

  myTeamDetails: any;
  memberEachDayWallet: any;
  memberTotalWalletOfEachMonth: any;
  memberWithdrawalHistoy: any;
  memberTotalWithdrawalAmount: any;
  memberRequest: any;
  totalPartnerCount:number;
  todayPartnerCount: number;

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
  usertype = localStorage.getItem("userType");
  currentdate: string;
  totalPayout:any;
  totalAmountCurrentMonth:any;
  totalAmountToday:any;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private router: Router,
    private dialog: MatDialog
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

    
    this.callApiTofetchTodaysAndTotal();
    this.myTeamDetailsInPopup();
    this.callApiMemberWalletDepositeDaily();
    this.callApiMemberTotalWalletofMonth();
    this.callApiMemberWithdrawalHistory();
    this.callApiMemberTotalWithdrawal();
    this.callApiMemberWithdrawalRequest();
    this.memberProfileDataPopup();
    this.fetchTotalCountPartner();
  }

  callApiTofetchTodaysAndTotal(){
    let currentdate = new Date();
    let year = currentdate.getFullYear().toString();
    let month = (currentdate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed, so add 1
    let day = currentdate.getDate().toString().padStart(2, "0");
    let formattedDate = `${year}-${month}-${day}`;

    console.log(formattedDate);

    let data1 = {
      userid: localStorage.getItem("userdetail"),
      currentDate:formattedDate
    };
    this.userService.callApiToFetchTodaysAndTotalPayout(data1).subscribe((response: any) => {
        if (response) {
          console.log(response,116)
          this.totalAmountToday = response.data.totalAmountToday
          this.totalAmountCurrentMonth = response.data.totalAmountCurrentMonth
          this.totalPayout = response.data.totalPayout
        }
      });
  }
  viewWithdrawalRequestList() {
    this.router.navigate(["/memberdashboard/withdrawal-request"]);
  }
  viewWithdrawalSuccessList() {
    this.router.navigate(["/memberdashboard/withdrawal-request"]);
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

  fetchTotalCountPartner() {
    const referralId = localStorage.getItem('mrefferid')
    this.userService.fetchTotalCountPartner(referralId).subscribe({
      next: (result: any) => {
        // Process the result as needed
        console.log(result);
        this.totalPartnerCount = result.totalPartnerCount
        this.todayPartnerCount = result.todayPartnerCount
      },
      error: error => {
        console.error('Error fetching referral counts:', error);
      }
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
      error: error => {
        console.log(error.error)
        this.toastr.error(error.error.message, 'Error');
      }

    })
  }

  memberViewBankDetailsDialog() {
    let config: MatDialogConfig = {
      panelClass: "memberViewBankDetailsDialogClass",
    };
    const dialogRef = this.dialog.open(MemberViewBankComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
  }

  memberEditBankDialog(){
    let config: MatDialogConfig = {
      panelClass: 'memberEditBankDetailsDialogClass',
    };
    const dialogRef = this.dialog.open(MemberEditBankComponent,config)
    
    dialogRef.afterClosed().subscribe(result => {
     
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
          console.log(response);
          this.memberTotalWalletOfEachMonth = response.data[0].member_wallet;
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
          //console.log(this.partnerDetailsIsActiveOrNot);
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
          console.log(this.memberWithdrawalHistoryArray);
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

  myProfileDialog() {
    let data = {
      userId: localStorage.getItem("stateHandlerId"),
    };
    this.userService.fetchStateBankDetails(data).subscribe({
      next: (response: any) => {
        if (response) {
          console.log(response.result);
          let config: MatDialogConfig = {
            panelClass: "stateViewBankDetailsDialogClass",
            data: response.result,
          };
          const dialogRef = this.dialog.open(
            MemberProfileDetailsComponent,
            config
          );
          dialogRef.afterClosed().subscribe((result) => {
            console.log("The dialog was closed");
            // Do something with the result if needed
          });
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // -----------------------------------------------------//

  viewListPartnerTeam() {
    this.router.navigate(["/memberdashboard/my-team"]);
  }

  memberAddBankDialog() {
    let config: MatDialogConfig = {
      panelClass: "memberAddBankDialogClass",
    };
    const dialogRef = this.dialog.open(MemberAddBankComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      // Do something with the result if needed
    });
  }

  openMemberDetailsDialog() {}
  memberDocumentsDialog() {}

  udgrade() {
    this.router.navigate(["/memberdashboard/promotion"]);
  }

  logOut() {
    localStorage.removeItem("token");
  }

  copyToClipboard() {
    const textToCopy = this.displayMemberRefferalId;
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    this.toastr.success("Referral ID copied to clipboard!", "Success");
  }

  shareFunction() {
    const displayMemberRefferalId = localStorage.getItem("mrefferid");
    const referralType = localStorage.getItem("userType");
    const message = `Check out this link: https://apps.centumworldrig.com/mininglogin and Referral type : ${referralType} , Referral ID : ${displayMemberRefferalId}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  }

  viewTodaysTransaction() {
    this.router.navigate(["/memberdashboard/todays-transaction"]);
  }
}
