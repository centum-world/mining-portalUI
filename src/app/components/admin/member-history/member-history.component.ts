import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogConfig } from "@angular/material/dialog";
import { ViewMemberComponent } from "../dialog/view-member/view-member.component";
import { VerifyMemberComponent } from "../dialog/verify-member/verify-member.component";
import { BlockMemberComponent } from "../dialog/block-member/block-member.component";
import { EditMemberComponent } from "../dialog/edit-member/edit-member.component";
import { Router } from "@angular/router";
import { ReferralupComponent } from "../target/referralup/referralup.component";
import { MyteamAdminComponent } from "../dialog/myteam-admin/myteam-admin.component";

interface Member {
  m_userid: string;
  m_name: string;
  m_lname: string;
  m_phone: string;
  m_email: string;
  m_gender: string;
  m_refferid: string;
  reffer_id: string;
  m_state: string;
  actions: string;
}

@Component({
  selector: "app-member-history",
  templateUrl: "./member-history.component.html",
  styleUrls: ["./member-history.component.css"],
})
export class MemberHistoryComponent implements OnInit {
  @ViewChild('paginatorVerified', { static: true }) paginatorVerified: MatPaginator;
  @ViewChild('paginatorUnverified', { static: true }) paginatorUnverified: MatPaginator;
  @ViewChild('paginatorUpgradeDowngrade', { static: true }) paginatorUpgradeDowngrade: MatPaginator;
  displayedColumns: string[] = [
    "m_userid",
    "m_name",
    "m_lname",
    "m_email",
    "m_phone",
    "m_gender",
    "m_refferid",
    "reffer_id",
    "m_state",
    "actions",
  ];

  downgradeColumns: string[] = [
    "m_userid",
    "m_name",
    "m_lname",
    "m_email",
    "m_phone",
    "m_gender",
    "m_refferid",
    "reffer_id",
    "m_state",
  ];
  // dataSource: MatTableDataSource<Member>;
  verifiedDataSource: MatTableDataSource<Member>;
  unverifiedDataSource: MatTableDataSource<Member>;
  upgradeDowngradeDataSource: MatTableDataSource<Member>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) {
    // this.dataSource = new MatTableDataSource([]);
    this.verifiedDataSource = new MatTableDataSource([]);
    this.unverifiedDataSource = new MatTableDataSource([]);
    this.upgradeDowngradeDataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.tabChanged(0);
    this.verifiedDataSource.paginator = this.paginatorVerified;
     this.unverifiedDataSource.paginator = this.paginatorUnverified;
     this.upgradeDowngradeDataSource.paginator = this.paginatorUpgradeDowngrade;;
  }

  tabChanged(event: any) {
    if (event === 0) {
      this.userService.CallApifetchVerifiedMember().subscribe({
        next: (res: any) => {
          this.verifiedDataSource.data = res.data;
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
    } else if (event === 1) {
      this.userService.CallApifetchUnVerifiedMember().subscribe({
        next: (res: any) => {
          this.unverifiedDataSource.data = res.data;
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
    } else if (event === 2) {
      this.userService.CallApifetchUpgradedMember().subscribe({
        next: (res: any) => {
          this.upgradeDowngradeDataSource.data = res.data;
        },
        error: (err) => {
          console.log("error");
        },
      });
    }
  }

  callApiToFetchAllMember() {
    this.userService.fetchMemberDetails().subscribe({
      next: (res: any) => {
        this.verifiedDataSource.data = res.memberData;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  applyFilter(filterValue: string) {
    this.verifiedDataSource.filter = filterValue.trim().toLowerCase();
    this.unverifiedDataSource.filter = filterValue.trim().toLowerCase();
    this.upgradeDowngradeDataSource.filter = filterValue.trim().toLowerCase();
  }

  openViewMemberDialog(memberData: any) {
    let config: MatDialogConfig = {
      panelClass: "myMemberViewDialogClass",
      data: memberData,
    };
    const dialogRef = this.dialog.open(ViewMemberComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Closed");
    });
  }

  openMemberTargetDialog(memberData:any){
    let config: MatDialogConfig = {
      data: memberData,
    };
    const dialogRef = this.dialog.open(ReferralupComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Closed");
    });
  }

  openMemberVerifyDialog(memberData: any) {
    let config: MatDialogConfig = {
      panelClass: "verifyMemberDialogClass",
      data: memberData,
    };
    const dialogRef = this.dialog.open(VerifyMemberComponent, config);
    dialogRef.componentInstance.okClicked.subscribe(() => {
      console.log("clicked");
      let verifyDate = new Date()
      let data = {
        isVerify: true,
        m_userid: memberData.m_userid,
        verifyDate
      };
      this.userService.adminVerifyMember(data).subscribe({
        next: (res: any) => {
          this.callApiToFetchAllMember();
          this.toastr.success(res.message);
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Closed");
    });
  }

  openIsBlockMemberDialog(memberData: any) {
    console.log(memberData);

    let config: MatDialogConfig = {
      panelClass: "myMemberBLockStateDialogClass",
      data: memberData,
    };
    const dialogRef = this.dialog.open(BlockMemberComponent, config);
    dialogRef.componentInstance.okClicked.subscribe(() => {
      let data = {
        isBlocked: !memberData.isBlocked,
        m_userid: memberData.m_userid,
      };
      this.userService.adminBlockOrUnblockMember(data).subscribe({
        next: (res: any) => {
          this.callApiToFetchAllMember();
          this.toastr.success(res.message);
        },
        error: (err) => {
          console.log(err);
        },
      });
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Closed");
    });
  }

  openMemberEditDialog(memberData: any) {
    let config: MatDialogConfig = {
      panelClass: "myMemberEditDialogClass",
      data: memberData,
    };
    const dialogRef = this.dialog.open(EditMemberComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      this.callApiToFetchAllMember();
      console.log("closed");
    });
  }

  gotoMemberAccountSection(memberData: any) {
    console.log(memberData.m_userid);
    this.router.navigate(["dashboard/member-account", memberData.m_userid]);
  }

  myPartner(memberData:any){
    this.router.navigate(["dashboard/my-partner", memberData.reffer_id]);
  }

  goBack() {
    this.router.navigate(["/dashboard/home"]);
  }

  myTeam(memberData:any){
    let config: MatDialogConfig = {
      // panelClass: "myMemberEditDialogClass",
      data: memberData,
    };
    const dialogRef = this.dialog.open(MyteamAdminComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      // this.callApiToFetchAllMember();
      console.log("closed");
    });
  }
}
