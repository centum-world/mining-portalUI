import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

interface PartnerReferralPayoutApproved {
  p_userid: string,
  partner_wallet: number,
  reffer_p_userid:string,
  request_date:Date,
  approve_date:Date,
}

@Component({
  selector: 'app-partner-referral-payout-approved',
  templateUrl: './partner-referral-payout-approved.component.html',
  styleUrls: ['./partner-referral-payout-approved.component.css']
})
export class PartnerReferralPayoutApprovedComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['serialNumber', 'p_userid', 'partner_wallet','serviceCharge', 'paybleAmount','referral','request_date','approve_date'];
  dataSource: MatTableDataSource<PartnerReferralPayoutApproved>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToFetchPartnerReferralPayoutApproved();
    this.dataSource.paginator = this.paginator;
  }

  callApiToFetchPartnerReferralPayoutApproved() {
    this.userService.fetchPartnerRefferalWithdrawalApproved().subscribe({
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
  addSerialNumbers(data: PartnerReferralPayoutApproved[]): PartnerReferralPayoutApproved[] {
    return data.map((item, index) => ({ ...item, serialNumber: index + 1 }));
  }

}
