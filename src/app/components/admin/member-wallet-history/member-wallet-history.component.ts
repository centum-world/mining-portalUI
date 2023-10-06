import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

interface MemberWalletHistory {
  m_userid: string,
  walletAmount: number,
  wallet_update_date: Date,
  reffer_user:string
}

@Component({
  selector: 'app-member-wallet-history',
  templateUrl: './member-wallet-history.component.html',
  styleUrls: ['./member-wallet-history.component.css']
})
export class MemberWalletHistoryComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['serialNumber', 'm_userid', 'walletAmount','reffer_user', 'wallet_update_date'];
  dataSource: MatTableDataSource<MemberWalletHistory>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToFetchAllPartnerWalletHistory();
    this.dataSource.paginator = this.paginator;
  }

  callApiToFetchAllPartnerWalletHistory() {
    this.userService.fetchMemberWalletOfMonth().subscribe({
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

  addSerialNumbers(data: MemberWalletHistory[]): MemberWalletHistory[] {
    return data.map((item, index) => ({ ...item, serialNumber: index + 1 }));
  }

}
