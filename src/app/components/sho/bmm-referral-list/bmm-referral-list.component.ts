import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { UserService } from "src/app/service/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { ViewChild } from "@angular/core";
import { Router } from '@angular/router';

interface Referral {
  m_name: string;
  m_lname: string;
  m_userid: string;
  m_email: string;
  m_phone: string;
  m_gender: string;
  m_add: string;
  m_State: string;
  m_refferid: string;
  reffer_id: string;
  isVerify: Boolean;
  // actions: string;
}

@Component({
  selector: "app-bmm-referral-list",
  templateUrl: "./bmm-referral-list.component.html",
  styleUrls: ["./bmm-referral-list.component.css"],
})
export class BmmReferralListComponent implements OnInit {
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
    "m_refferid",
    "reffer_id",
    "isVerify",
    // "actions",
  ];
  dataSource: MatTableDataSource<Referral>;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  
  ngOnInit() {
    this.callApiToGetAllReferralList();
    this.dataSource.paginator = this.paginator;
  }

  callApiToGetAllReferralList() {
    let data = {
      referralId: localStorage.getItem('stateRefferalId')
    }
    this.userService.apiToGetAllRefferalDetails(data).subscribe({
      next: (res: any) => {
        console.log(res.Referral);
        this.dataSource.data = res.Referral
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  gotoDashboard(){
    this.router.navigate(['/statedashboard'])
  }
}
