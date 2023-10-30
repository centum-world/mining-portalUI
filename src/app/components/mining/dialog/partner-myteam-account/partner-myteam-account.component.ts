import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-partner-myteam-account',
  templateUrl: './partner-myteam-account.component.html',
  styleUrls: ['./partner-myteam-account.component.css']
})
export class PartnerMyteamAccountComponent implements OnInit {
  partnerDetails = {
    lastPaymentDate:"",
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService:UserService) { 
    console.log(data)
  }

  ngOnInit() {
    this.lastApproveDate();
  }

  lastApproveDate() {
    let approveArray = [];
    let data = {
      p_userid: this.data.p_userid
    }
    this.userService.partnerLastApproveDate(data).subscribe({
      next: (result: any) => {
        console.log(result)
        approveArray = Object.values(result.data);
        let lastPaymentOfIndex = approveArray.length;
        this.partnerDetails.lastPaymentDate = approveArray[lastPaymentOfIndex - 1].approve_date;
        console.log(this.partnerDetails.lastPaymentDate);
      }
    })
  }

}
