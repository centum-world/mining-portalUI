import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mining-partner-details',
  templateUrl: './mining-partner-details.component.html',
  styleUrls: ['./mining-partner-details.component.css']
})
export class MiningPartnerDetailsComponent implements OnInit {
  @Output() partnerView = new EventEmitter();
  miningPartnerDetails = null;
  constructor(private userService: UserService, private toastr: ToastrService, private datePipe: DatePipe) { }
  p: number = 1;
  searchText:any;
  partnerDetails = {
    name: '',
    aadhar: '',
    phone: '',
    email: '',
    address: '',
    state: '',
    dob: '',
    dop: '',
    nominee_name: '',
    nominee_aadhar: '',
    nominee_phone: '',
    liquidity:'',
    user_id: '',
    password: ''
  }
  ngOnInit() {

    this.fetchPartnerDetails();
  }
  //child to parent
  individualPartnerFunction(value) {
    this.partnerView.emit(value);
  }
  //partner details for admin
  fetchPartnerDetails() {
    this.userService.fetchMiningPartner().subscribe({
      next: (response: any) => {
        if (response) {
          this.miningPartnerDetails = Object.values(response.data);
        }

      },
      error: error => {
        this.toastr.error('Somthing went wrong', 'Error');
      }

    })
  }

  fetchPartnerDetailsUsingPartnerId(id) {
    let data = {
      p_userid: id
    }
    this.userService.fetchPartnerDetailsForAdminUsingPartnerId(data).subscribe({
      next: (response: any) => {
        this.partnerDetails.name = response.data[0].p_name;
        this.partnerDetails.phone = response.data[0].p_phone;
        this.partnerDetails.aadhar = response.data[0].p_aadhar;
        this.partnerDetails.email = response.data[0].p_email;
        this.partnerDetails.address = response.data[0].p_address;
        this.partnerDetails.state = response.data[0].p_state;
        this.partnerDetails.dob = this.datePipe.transform(response.data[0].p_dob, 'yyyy-MM-dd');
        this.partnerDetails.dop = this.datePipe.transform(response.data[0].p_dop, 'yyyy-MM-dd');
        this.partnerDetails.nominee_name = response.data[0].p_nominee_name;
        this.partnerDetails.nominee_aadhar = response.data[0].p_nominee_aadhar;
        this.partnerDetails.nominee_phone = response.data[0].p_nominee_phone;
        this.partnerDetails.liquidity = response.data[0].p_liquidity;
        this.partnerDetails.user_id = response.data[0].p_userid;
        this.partnerDetails.password = response.data[0].p_password;
      },
      error: error => {
        this.toastr.error('Somthing went wrong', 'Error');
      }

    })
  }
  changePartnerLiquidity(e) {
    this.partnerDetails.liquidity = e.target.value;
  }

  updatePartnerData() {
    let data = {
      p_name: this.partnerDetails.name,
      p_aadhar: this.partnerDetails.aadhar,
      p_phone: this.partnerDetails.phone,
      p_email: this.partnerDetails.email,
      p_address: this.partnerDetails.address,
      p_state: this.partnerDetails.state,
      p_dob: this.partnerDetails.dob,
      p_dop: this.partnerDetails.dop,
      p_nominee_name: this.partnerDetails.nominee_name,
      p_nominee_aadhar: this.partnerDetails.nominee_aadhar,
      p_nominee_phone: this.partnerDetails.nominee_phone,
      p_liquidity: this.partnerDetails.liquidity,
      p_userid: this.partnerDetails.user_id

    }

    this.userService.updatePartnerDetailsFromAdmin(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.toastr.success('Update Successfully', 'Success');
          this.ngOnInit();
        }

      },
      error: error => {
        this.toastr.error('Something went wrong', 'Error');
      }
    })
  }

}
