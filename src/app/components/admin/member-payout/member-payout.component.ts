import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/service/user.service";
import { MyteamAdminComponent } from "../dialog/myteam-admin/myteam-admin.component";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogConfig } from "@angular/material/dialog";

@Component({
  selector: "app-member-payout",
  templateUrl: "./member-payout.component.html",
  styleUrls: ["./member-payout.component.css"],
})
export class MemberPayoutComponent implements OnInit {
  referral_id: string = "";
  newPartnerTeam: [] = [];
  partner: [] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog,
  ) {
    this.route.params.subscribe((params) => {
      this.referral_id = params["id"];
    });
  }

  ngOnInit() {
    this.callApiToMyTeam();
  }

  callApiToMyTeam() {
    let referralID = {
      referralId: this.referral_id,
    };
    this.userService.callApiToMyteamForReferral(referralID).subscribe({
      next: (res: any) => {
        console.log(res);
        this.partner = res.partners;
        this.newPartnerTeam = res.multiplePartners;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  goBack() {
    this.router.navigate(["/dashboard/member-history"]);
  }

  memberGiveMoney(memberData:any,type:string) {
    let config: MatDialogConfig = {
      data: {
        memberData: memberData,
        type: type,
        referral_id: this.referral_id
      }
    };
    const dialogRef = this.dialog.open(MyteamAdminComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      // this.callApiToFetchAllMember();
      console.log("closed");
    });
  }

  viewDetails(data:any){
    console.log(data.rigId);
    this.router.navigate(["/dashboard/my-partner",this.referral_id , data.rigId]);
  }
}
