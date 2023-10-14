import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { UserService } from "src/app/service/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogConfig } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { MemberVerifyModelComponent } from "../member-verify-model/member-verify-model.component";
import { MemberViewModelComponent } from "../member-view-model/member-view-model.component";
import { MemberBlockModelComponent } from "../member-block-model/member-block-model.component";

interface BusinessDeveloper {
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
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"],
})
export class MemberListComponent implements OnInit {
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

  dataSource: MatTableDataSource<BusinessDeveloper>;

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
      referralId: localStorage.getItem("bdRefferalId"),
    };

    this.userService.getAllMemberDetails(data).subscribe({
      next: (res: any) => {
        this.dataSource.data = res.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openViewMemberDialog(data: any) {
    console.log(data);
    let config: MatDialogConfig = {
      height: "45%",
      width: "55%",
      panelClass: "myStateDialogClass",
      data: data,
    };
    const dialogRef = this.dialog.open(MemberViewModelComponent, config);
    dialogRef.componentInstance.okClicked.subscribe(() => {
      console.log("clicked");
    });
  }

  openVerifyMemberDialog(id: any) {
    this.memberId = id.m_userid;
    let config: MatDialogConfig = {
      panelClass: "franchiseVerifyDialogClass",
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
          console.log(err);
        },
      });
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Closed");
    });
  }

  openIsBlockMemberDialog(id: any) {
    this.memberId = id.m_userid;
    this.isBlock = id.isBlocked;
    let config: MatDialogConfig = {
      height: "26%",
      width: "23%",
      panelClass: "myStateDialogClass",
      data: id,
    };
    const dialogRef = this.dialog.open(MemberBlockModelComponent, config);
    console.log(id);

    dialogRef.componentInstance.okClicked.subscribe(() => {
      let data = {
        m_userid: this.memberId,
        isBlocked: !this.isBlock,
      };
      this.userService.blockAndUnblockMember(data).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message);
          this.callApiToGetAllMembersList();
        },
        error: (error) => {
          console.log(error);
        },
      });
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Closed");
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
