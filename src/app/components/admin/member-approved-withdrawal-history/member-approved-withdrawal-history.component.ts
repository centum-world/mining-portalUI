import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface MemberApprovedWithdrawal {
  m_userid: string,
  member_wallet: number,
  reffer_p_userid: string,
  request_date:Date,
  approve_date:Date,
}


@Component({
  selector: 'app-member-approved-withdrawal-history',
  templateUrl: './member-approved-withdrawal-history.component.html',
  styleUrls: ['./member-approved-withdrawal-history.component.css']
})
export class MemberApprovedWithdrawalHistoryComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['serialNumber', 'm_userid', 'member_wallet','serviceCharge', 'paybleAmount','refferal','request_date','approve_date'];
  dataSource: MatTableDataSource<MemberApprovedWithdrawal>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router:Router,
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToFetchMemberApprovedWithdrawal();
    this.dataSource.paginator = this.paginator;
  }

  callApiToFetchMemberApprovedWithdrawal() {
    this.userService.approvedMemberWithdrawalAmount().subscribe({
      next: (res: any) => {
        // console.log(res)
        const dataWithSerial = this.addSerialNumbers(res.data);
        this.dataSource.data = dataWithSerial;
      },
      error: (err) => {
        console.log(err.message);
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addSerialNumbers(data: MemberApprovedWithdrawal[]): MemberApprovedWithdrawal[] {
    return data.map((item, index) => ({ ...item, serialNumber: index + 1 }));
  }

  goBack(){
    this.router.navigate(['/dashboard/home'])
  }

}
