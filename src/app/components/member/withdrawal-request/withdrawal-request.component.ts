import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface MemberWithdrawalRequest {
  m_userid: string,
  member_wallet: number,
  reffer_p_userid: string,
  request_date:Date,
}

@Component({
  selector: 'app-withdrawal-request',
  templateUrl: './withdrawal-request.component.html',
  styleUrls: ['./withdrawal-request.component.css']
})
export class WithdrawalRequestComponent implements OnInit {

  partnerRequestHistory = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['serialNumber', 'm_userid', 'member_wallet','serviceCharge', 'paybleAmount','refferal','request_date'];
  dataSource: MatTableDataSource<MemberWithdrawalRequest>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router:Router
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToFetchMemberWithdrawalRequest();
    this.dataSource.paginator = this.paginator;
  }

  callApiToFetchMemberWithdrawalRequest() {
    let data = {
      m_userid:localStorage.getItem('userdetail')
    }
    this.userService.memberWithdrawalRequstInMemberPortal(data).subscribe({
      next: (res: any) => {
         console.log(res)
         this.partnerRequestHistory = res.data
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

  addSerialNumbers(data: MemberWithdrawalRequest[]): MemberWithdrawalRequest[] {
    return data.map((item, index) => ({ ...item, serialNumber: index + 1 }));
  }

  goBack(){
    this.router.navigate(['/memberdashboard/home'])
  }

}
