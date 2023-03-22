import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
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
    holder_name: '',
    account_no: '',
    ifsc_code: '',
    branch_name: '',
    bank_name: ''
  }
  memberRefferalId: any;
  memberRefferalIdToPartner: any;
  displayMemberRefferalId = '';
  displayMemberRefferalIdToPartner: any;
  withdrawAmount: any;
  displayUserId: any;


  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {


    this.displayUserId = localStorage.getItem('userdetail');
    let data = {
      m_userid: localStorage.getItem('userdetail')
    }
    this.userService.memberRefferalId(data).subscribe((response: any) => {
      if (response) {
        this.memberRefferalId = Object.values(response);
        this.displayMemberRefferalId = this.memberRefferalId[1][0].reffer_id;

      } else {
        // console.log("error");
      }
    });


    let myteamwithpartner = {
      p_reffered_id: localStorage.getItem('mrefferid')
    }

    this.userService.useRefferalIdOfMemberToFetchMiningPartner(myteamwithpartner).subscribe({
      next: (response: any) => {
        if (response) {
          this.memberRefferalIdToPartner = Object.values(response.data);
        }
      },
      error: error => {
        this.toastr.error('Something Went Wrong', 'Error');
      }

    })

    this.myTeamDetailsInPopup();
    this.callApiMemberWalletDepositeDaily();
    this.callApiMemberTotalWalletofMonth();
    this.callApiMemberWithdrawalHistory();
    this.callApiMemberTotalWithdrawal();
    this.callApiMemberWithdrawalRequest();
  }


  myTeamDetailsInPopup() {

    let myteam = {
      m_refferid: localStorage.getItem('mrefferid')
    }
    this.userService.memberMyTeam(myteam).subscribe({
      next: (response: any) => {
        if (response) {
          this.myTeamDetails = Object.values(response.data);
        }
      },
      error: error => {
        this.toastr.error('Something Went Wrong', 'Error');
      }

    })
  }


  memberDetails() {
    this.profileDetails = true;
  }

  addMemberBankDetails() {

    let data = {
      user_id: localStorage.getItem('userdetail'),
      holder_name: this.bankDetails.holder_name,
      account_no: this.bankDetails.account_no,
      ifsc_code: this.bankDetails.ifsc_code,
      branch_name: this.bankDetails.branch_name,
      bank_name: this.bankDetails.bank_name
    }

    this.userService.addMemberBankDetails(data).subscribe({
      next: (response) => {
        if (response) {
          this.toastr.success('Bank Added Successfully', 'Success');

        }
      },
      error: error => {
        this.toastr.error('Something Went Wrong', 'Error');
      }

    })
  }

  callApiMemberWalletDepositeDaily() {
    let data = {
      m_userid: localStorage.getItem('userdetail')
    }
    this.userService.memberWalletDepositeEachDay(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.memberEachDayWallet = Object.values(response.data);

        }
      },
      error: error => {
        this.toastr.error('Something Went Wrong', 'Error');
      }

    })
  }

  callApiMemberTotalWalletofMonth() {
    let data = {
      m_userid: localStorage.getItem('userdetail')
    }
    this.userService.memberTotalWalletOfAMonth(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.memberTotalWalletOfEachMonth = response.data[0].sumOfMemberWallet;
        }
      },
      error: error => {
        this.toastr.error('Something Went Wrong', 'Error');
      }
    })
  }


  callApiMemberWithdrawalHistory() {
    let data = {
      m_userid: localStorage.getItem('userdetail')
    }
    this.userService.memberWithdrawalApproved(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.memberWithdrawalHistoy = Object.values(response.data);

        }
      },
      error: error => {
        this.toastr.error('Something Went Wrong', 'Error');
      }

    })
  }

  callApiMemberTotalWithdrawal() {
    let data = {
      m_userid: localStorage.getItem('userdetail')
    }
    this.userService.memberTotalWithdrawaHistoty(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.displayMemberRefferalIdToPartner = Object.values(response.data);
          this.withdrawAmount = this.displayMemberRefferalIdToPartner[0].sumOfMemberWallet;
        
          
        }
      },
      error: error => {
        this.toastr.error('Something Went Wrong', 'Error');
      }
    })
  }

  callApiMemberWithdrawalRequest() {
    let data = {
      m_userid: localStorage.getItem('userdetail')
    }
    this.userService.memberWithdrawalRequstInMemberPortal(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.memberRequest = Object.values(response.data);
        }
      },
      error: error => {
        this.toastr.error('Something Went Wrong ', 'Error');
      }

    })
  }

  logOut() {
    localStorage.removeItem('token');
  }
}
