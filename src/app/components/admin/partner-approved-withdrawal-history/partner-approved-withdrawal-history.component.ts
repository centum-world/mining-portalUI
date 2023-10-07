import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

interface PartnerApprovedWithdrawal {
  p_userid: string,
  partner_wallet: number,
  request_date:Date,
  approve_date:Date,
}

@Component({
  selector: 'app-partner-approved-withdrawal-history',
  templateUrl: './partner-approved-withdrawal-history.component.html',
  styleUrls: ['./partner-approved-withdrawal-history.component.css']
})
export class PartnerApprovedWithdrawalHistoryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['serialNumber', 'p_userid', 'partner_wallet','serviceCharge', 'paybleAmount','request_date','approve_date'];
  dataSource: MatTableDataSource<PartnerApprovedWithdrawal>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToFetchPartnerApprovedWithdrawal();
    this.dataSource.paginator = this.paginator;
  }

  callApiToFetchPartnerApprovedWithdrawal() {
    this.userService.finalApprovedWithdrawalList().subscribe({
      next: (res: any) => {
         console.log(res)
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
  addSerialNumbers(data: PartnerApprovedWithdrawal[]): PartnerApprovedWithdrawal[] {
    return data.map((item, index) => ({ ...item, serialNumber: index + 1 }));
  }


}
