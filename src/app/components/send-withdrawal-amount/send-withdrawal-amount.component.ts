import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-send-withdrawal-amount',
  templateUrl: './send-withdrawal-amount.component.html',
  styleUrls: ['./send-withdrawal-amount.component.css']
})
export class SendWithdrawalAmountComponent implements OnInit {

  @Output() uderid: EventEmitter<string> = new EventEmitter();

  withdrawalRequestData = [];
  availableRq: boolean = true;
  partnerUserId: string = '';
  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.partnerUserId = localStorage.getItem('partnerUserId');
    this.fetchWithdrawalRequestByAdmin();

  }

  // send withdrawal request by partner and received by admin

  fetchWithdrawalRequestByAdmin() {
    this.userService.fetchWithdrawalRequestByAdmin().subscribe({
      next: (response: any) => {
        if (response) {
          this.withdrawalRequestData = Object.values(response.data);
          console.log(this.withdrawalRequestData);
        }
      },
      error: error => {
        this.toastr.error('Something went wrong', 'Error');
      }
    }
    )

  }

  sendUserId(value,id) {
    this.uderid.emit(value);
    let data = {
      p_userid: value,
      id:id
    }
    console.log(data);
    this.userService.approvedWithdrawalHistory(data).subscribe({
      next: response => {
        if (response) {
          this.ngOnInit();
          this.toastr.success('Request Approved', 'Success');
        }
      },
      error: error => {
        this.toastr.error('Something went wrong', 'Error');
      }
    })

  }

  requestAvailable() {

    if (!!this.withdrawalRequestData) {
      this.availableRq = false;
    } else {
      this.availableRq = true;
    }

  }

}
