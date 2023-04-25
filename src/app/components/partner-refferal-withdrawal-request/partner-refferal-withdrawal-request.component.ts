import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-partner-refferal-withdrawal-request',
  templateUrl: './partner-refferal-withdrawal-request.component.html',
  styleUrls: ['./partner-refferal-withdrawal-request.component.css']
})
export class PartnerRefferalWithdrawalRequestComponent implements OnInit {
  refferalWithdrawalRequestData = [];
  availableRq: boolean = true;
  partnerUserId: string = '';
  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    //this.partnerUserId = localStorage.getItem('partnerUserId');
    this.partnerRefferalWithdrawalRequest();
  }

  partnerRefferalWithdrawalRequest(){
    this.userService.fetchPartnerRefferalAmountRequest().subscribe({
      next: (response: any) => {
        if (response) {
          this.refferalWithdrawalRequestData = Object.values(response.data);
          console.log(this.refferalWithdrawalRequestData);
        }
      },
      error: error => {
        this.toastr.error('Something went wrong', 'Error');
      }
    })
  }

  sendUserId(value,id) {
    console.log(value,id);
    
    let data = {
      id:id,
      p_userid: value
     
    }
    this.userService.approvePartnerRefferalWithdrawalRequest(data).subscribe({
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

}
