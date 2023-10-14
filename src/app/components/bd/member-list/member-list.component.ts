import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MemberVerifyModelComponent } from '../member-verify-model/member-verify-model.component';

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
  // isVerify: string;
  // actions: string;
}

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})

export class MemberListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = [
    'm_name',
    'm_lname',
    'm_email',
    'm_phone',
    'm_gender',
    'm_add',
    'm_state',
    'reffer_id',
    'm_refferid',
    'actions'
  ];

  businessDeveloperId: string = "";
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
      referralId: localStorage.getItem('bdRefferalId')
    };

    this.userService.getAllMemberDetails(data).subscribe({
      next: (res: any) => {
        this.dataSource.data = res.results;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openVerifyDialog(id: any) {
    this.businessDeveloperId = id.businessDeveloperId;
    let config: MatDialogConfig = {
      panelClass: 'franchiseVerifyDialogClass'
    };
    const dialogRef = this.dialog.open(MemberVerifyModelComponent, config);


    dialogRef.componentInstance.okClicked.subscribe(() => {
      let data = {
        businessDeveloperId: this.businessDeveloperId,
        isVerify: true
      };
      this.userService.bdVerifyMember(data).subscribe({
        next: (res) => {
          this.toastr.success('Franchise verified');
          this.callApiToGetAllMembersList();
        },
        error: (err) => {
          console.log(err);
        }
      });
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Closed");
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
