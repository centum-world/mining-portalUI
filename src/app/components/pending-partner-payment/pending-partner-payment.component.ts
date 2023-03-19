import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pending-partner-payment',
  templateUrl: './pending-partner-payment.component.html',
  styleUrls: ['./pending-partner-payment.component.css']
})
export class PendingPartnerPaymentComponent implements OnInit {

  constructor(private userService: UserService, private toastr: ToastrService) { }

  pendingPartnerListing: any;
  ngOnInit() {

    this.pendingPayemntPartner();

  }
  pendingPayemntPartner() {
    this.userService.pendingPayemntPartnerList().subscribe({
      next: (response: any) => {
        if (response) {
          this.pendingPartnerListing = Object.values(response.data);


        }
      },
      error: error => {
        this.toastr.error('Something went wrong', 'Error');
      }
    })
  }

}
