import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

interface BankDetails {
  holder_name: string;
  account_no: string;
  branch_name: string;
  ifsc_code: string;
  bank_name: string;
}

@Component({
  selector: 'app-franchise-view-bank-details',
  templateUrl: './franchise-view-bank-details.component.html',
  styleUrls: ['./franchise-view-bank-details.component.css']
})
export class FranchiseViewBankDetailsComponent implements OnInit {
  bankDetails: BankDetails[] = [];
  selectedBank = {
    bankName: null
  };

  franchiseId = "";
  dataSource: MatTableDataSource<BankDetails>;
  displayFranchiseId = localStorage.getItem('franchiseId');
  displayedColumns: string[] = ['holder_name', 'bank_name', 'branch_name', 'account_no', 'ifsc_code'];
  noBankDetailsFound = false;

  constructor(private userService: UserService, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataSource = new MatTableDataSource([]);
    if (data && data.length > 0) {
      this.dataSource.data = data;
      this.bankDetails = data;
      for (const entry of data) {
        if (entry.isPrimary === 1) {
          this.selectedBank.bankName = entry.bank_name;
          this.franchiseId = entry.user_id;
        }
      }
    } else {
      this.noBankDetailsFound = true;
    }
  }

  ngOnInit() {
  }

  onRadioChange() {
    console.log(this.selectedBank.bankName, this.franchiseId);
    let data = {
      user_id: localStorage.getItem("franchiseId"),
      bank_name: this.selectedBank.bankName
    };

    this.userService.franchieChangePrimarybank(data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
      },
      error: (err => {
        this.toastr.warning(err.error.message);
      })
    });
  }
}
