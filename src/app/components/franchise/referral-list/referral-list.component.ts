import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { UserService } from "src/app/service/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogConfig } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ViewMemberComponent } from "../../admin/dialog/view-member/view-member.component";
import { MemberVerifyModelComponent } from "../../bd/member-verify-model/member-verify-model.component";

interface MemberData {
  m_name: string;
  m_lname: string;
  m_userid: string;
  m_email: string;
  m_phone: string;
  m_gender: string;
  m_add: string;
  m_state: string;
  reffer_id: string; // referralId
  m_refferid: string; // referredId
  isVerify: string;
  actions: string;
}

@Component({
  selector: "app-referral-list",
  templateUrl: "./referral-list.component.html",
  styleUrls: ["./referral-list.component.css"],
})
export class ReferralListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = [
    "m_userid",
    "m_name",
    "m_lname",
    "m_email",
    "m_phone",
    "m_gender",
    "m_add",
    "m_state",
    "reffer_id",
    "m_refferid",
    "isVerify",
    "actions",
  ];

  memberId: string = "";
  isBlock: boolean;

  dataSource: MatTableDataSource<MemberData>;
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToGetAllMembersList();
    this.dataSource.paginator = this.paginator;
  }

  callApiToGetAllMembersList() {
    let data = {
      referralId: localStorage.getItem("franchiseRefferalId"),
    };

    this.userService.getAllMemberDetails(data).subscribe({
      next: (res: any) => {
        this.dataSource.data = res.results;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  openViewMemberDialog(data: any) {
    console.log(data, "data is coming");
    let config: MatDialogConfig = {
      panelClass: "myMemberViewDialogClass",
      data: data,
    };
    const dialogRef = this.dialog.open(ViewMemberComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Closed");
    });
  }

  openVerifyMemberDialog(id: any) {
    this.memberId = id.m_userid;
    let config: MatDialogConfig = {
      panelClass: "VerifyMemberInFranchiseDialogClass",
    };
    const dialogRef = this.dialog.open(MemberVerifyModelComponent, config);

    dialogRef.componentInstance.okClicked.subscribe(() => {
      let data = {
        m_userid: this.memberId,
        isVerify: true,
      };
      this.userService.bdVerifyMember(data).subscribe({
        next: (res) => {
          this.toastr.success("Member verified");
          this.callApiToGetAllMembersList();
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  
  goBack() {
    this.router.navigate(["/franchisedashboard"]);
  }
}
