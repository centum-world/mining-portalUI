import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
import { MemberProfileDetailsComponent } from "../modal/member-profile-details/member-profile-details.component";
import { MemberDocumentsDetailsComponent } from "../modal/member-documents-details/member-documents-details.component";
import { MemberSummaryComponent } from "../modal/member-summary/member-summary.component";

@Component({
  selector: "app-member-header",
  templateUrl: "./member-header.component.html",
  styleUrls: ["./member-header.component.css"],
})
export class MemberHeaderComponent implements OnInit {
  isVisible: boolean = false;
  memberRefferalIdToPartner: any;

  monthlyPayment: any;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService
  ) {}
  memberDetails: any = {};
  memberDocuments = {
    aadharFrontSide: "",
    aadharBackSide: "",
    panCard: "",
  };
  memberSummary: any = [];

  ngOnInit() {
    let myteamwithpartner = {
      p_reffered_id: localStorage.getItem("mrefferid"),
    };

    this.userService
      .useRefferalIdOfMemberToFetchMiningPartner(myteamwithpartner)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.memberRefferalIdToPartner = Object.values(response.data);
            console.log(Object.values(response.data), "117");
          }
        },
        error: (error) => {
          this.toastr.error("Something Went Wrong", "Error");
        },
      });
  }

  toggleSidebar() {
    this.isVisible = !this.isVisible;
  }

  closeSidebar() {
    this.isVisible = false;
  }

  // fetchPartnerLiquidity(id) {
  //   let lequidity = '';
  //   let data = {
  //     p_userid: id
  //   }
  //   this.userService.fetchPartnerLiquidity(data).subscribe({
  //     next: (response: any) => {
  //       lequidity = response.data[0].p_liquidity;
  //       if (parseInt(lequidity) === 1200000) {
  //         this.monthlyPayment = 22000;
  //       }
  //       if (parseInt(lequidity) === 600000) {
  //         this.monthlyPayment = 11000;
  //       }
  //       if (parseInt(lequidity) === 300000) {
  //         this.monthlyPayment = 5500;
  //       }
  //       if (parseInt(lequidity) === 200000) {
  //         this.monthlyPayment = 3700;
  //       }
  //       if (parseInt(lequidity) === 100000) {
  //         this.monthlyPayment = 1850;
  //       }
  //     },
  //     error: error => {
  //       this.toastr.error("Something went wrong", 'Error');
  //     }
  //   })
  // }

  myProfileDialog() {
    this.isVisible = false;
    let data = {
      m_userid: localStorage.getItem("userdetail"),
    };
    this.userService.fetchMemberPortalDetails(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.memberDetails.fname = response.data[0].m_name;
          this.memberDetails.lname = response.data[0].m_lname;
          this.memberDetails.phone = response.data[0].m_phone;
          this.memberDetails.email = response.data[0].m_email;
          this.memberDetails.address = response.data[0].m_add;
          this.memberDetails.dob = response.data[0].m_dob;
          this.memberDetails.gender = response.data[0].m_gender;
          this.memberDetails.referredId = response.data[0].m_refferid;
          this.memberDetails.referralId = response.data[0].reffer_id;
          this.memberDetails.memberId = response.data[0].m_userid;
          this.memberDetails.state = response.data[0].m_state;
          this.memberDetails.designation = response.data[0].m_designation;

          let config: MatDialogConfig = {
            panelClass: "memberDetailsDialogClass",
            data: this.memberDetails,
          };
          const dialogRef = this.dialog.open(
            MemberProfileDetailsComponent,
            config
          );
          dialogRef.afterClosed().subscribe((result) => {
            console.log("The dialog was closed");
          });
        }
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }

  summaryOpenDialog() {
    let myteamwithpartner = {
      p_reffered_id: localStorage.getItem("mrefferid"),
    };
    this.userService
      .useRefferalIdOfMemberToFetchMiningPartner(myteamwithpartner)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.memberSummary = response.data;

            let config: MatDialogConfig = {
              panelClass: "memberSummaryDialogClass",
              data: this.memberSummary,
            };
            const dialogRef = this.dialog.open(MemberSummaryComponent, config);
            dialogRef.afterClosed().subscribe((result) => {
              console.log("The dialog was closed");
            });
          }
        },
        error: (error) => {
          console.log(error.error.message);
        },
      });
  }

  myDocumentsDialog() {
    this.isVisible = false;
    let data = {
      m_userid: localStorage.getItem("userdetail"),
    };

    this.userService.fetchMemberPortalDetails(data).subscribe({
      next: (response: any) => {
        if (response) {
          (this.memberDocuments.aadharFrontSide =
            response.data[0].adhar_front_side),
            (this.memberDocuments.aadharBackSide =
              response.data[0].adhar_back_side),
            (this.memberDocuments.panCard = response.data[0].panCard);
        }
        console.log(this.memberDocuments);
        let config: MatDialogConfig = {
          panelClass: "memberProfileDocumetsDialogClass",
          data: this.memberDocuments,
        };
        const dialogRef = this.dialog.open(
          MemberDocumentsDetailsComponent,
          config
        );

        dialogRef.afterClosed().subscribe((result) => {
          console.log("The dialog was closed");
        });
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }

  withdrawal() {
    this.router.navigate(["/memberdashboard/withdrawal-request"]);
    this.isVisible = false;
  }

  myTeam() {
    this.router.navigate(["/memberdashboard/my-team"]);
    this.isVisible = false;
  }

  partnerList() {
    this.router.navigate(["/memberdashboard/partner-list"]);
    this.isVisible = false;
  }

  referralPayout() {
    this.router.navigate(["/memberdashboard/referral-payout"]);
    this.isVisible = false;
  }

  dashboard() {
    this.router.navigate(["/memberdashboard"]);
  }

  promotion() {
    this.router.navigate(["/memberdashboard/promotion"]);
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(["/memberlogin"]);
  }
}
