import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mining-profile-details',
  templateUrl: './mining-profile-details.component.html',
  styleUrls: ['./mining-profile-details.component.css']
})
export class MiningProfileDetailsComponent implements OnInit {

  partnerDetails: any;
  bankDetails: any;

  partnerDataUpdate = {
    p_userid: '',
    p_name: '',
    p_phone: '',
    p_aadhar: '',
    p_email: '',
    p_address: '',
    p_state: '',
    p_nominee_name: '',
    p_nominee_aadhar: '',
    p_nominee_phone: '',
    p_dob: '',
    p_password: ''
  }

  popupDataUpdate = {
    name: '',
    phone: '',
    aadhar: '',
    email: '',
    address: '',
    state: '',
    nominee_name: '',
    nominee_aadhar: '',
    nominee_phone: '',
    dob: '',
    password: ''
  }
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {

    this.miningProfileDetails();
    this.miningBankDetails();
  }

  miningProfileDetails() {
    let partnerIdDetails = localStorage.getItem('partnerdetails');
    let data = {
      p_userid: partnerIdDetails
    }

    this.userService.fetchMiningPartnerProfileDetails(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.partnerDetails = Object.values(response.data);
          this.partnerDataUpdate.p_name = this.partnerDetails[0].p_name;
          this.partnerDataUpdate.p_phone = this.partnerDetails[0].p_phone;
          this.partnerDataUpdate.p_aadhar = this.partnerDetails[0].p_aadhar;
          this.partnerDataUpdate.p_email = this.partnerDetails[0].p_email;
          this.partnerDataUpdate.p_address = this.partnerDetails[0].p_address;
          this.partnerDataUpdate.p_state = this.partnerDetails[0].p_state;
          this.partnerDataUpdate.p_nominee_name = this.partnerDetails[0].p_nominee_name;
          this.partnerDataUpdate.p_nominee_aadhar = this.partnerDetails[0].p_nominee_aadhar;
          this.partnerDataUpdate.p_nominee_phone = this.partnerDetails[0].p_nominee_phone;
          this.partnerDataUpdate.p_dob = this.datePipe.transform(this.partnerDetails[0].p_dob, 'yyyy-MM-dd');
          this.partnerDataUpdate.p_password = this.partnerDetails[0].p_password;

        }
      },
      error: error => {
        this.toastr.error('Something Went Wrong', 'Error');
      }
    })

  }
  miningBankDetails() {
    let data = {
      user_id: localStorage.getItem('partnerdetails')
    }
    this.userService.fetchMiningPartnerBankDetails(data).subscribe((response: any) => {
      if (response) {
        this.bankDetails = Object.values(response);
      } else {
        // console.log("error");
      }
    })
  }

  updatePartnerData() {
    this.popupDataUpdate.name = this.partnerDataUpdate.p_name;
    this.popupDataUpdate.phone = this.partnerDataUpdate.p_phone;
    this.popupDataUpdate.aadhar = this.partnerDataUpdate.p_aadhar;
    this.popupDataUpdate.email = this.partnerDataUpdate.p_email;
    this.popupDataUpdate.address = this.partnerDataUpdate.p_address;
    this.popupDataUpdate.state = this.partnerDataUpdate.p_state;
    this.popupDataUpdate.nominee_name = this.partnerDataUpdate.p_nominee_name;
    this.popupDataUpdate.nominee_aadhar = this.partnerDataUpdate.p_nominee_aadhar;
    this.popupDataUpdate.nominee_phone = this.partnerDataUpdate.p_nominee_phone;
    this.popupDataUpdate.dob = this.partnerDataUpdate.p_dob;

    let data = {
      p_userid: localStorage.getItem('partnerdetails'),
      p_name: this.popupDataUpdate.name,
      p_phone: this.popupDataUpdate.phone,
      p_aadhar: this.popupDataUpdate.aadhar,
      p_email: this.popupDataUpdate.email,
      p_address: this.popupDataUpdate.address,
      p_state: this.popupDataUpdate.state,
      p_nominee_name: this.popupDataUpdate.nominee_name,
      p_nominee_aadhar: this.popupDataUpdate.nominee_aadhar,
      p_nominee_phone: this.popupDataUpdate.nominee_phone,
      p_dob: this.popupDataUpdate.dob

    }

    this.userService.updatePartnerData(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.toastr.success('Data Updated Successfully', 'Success');
          this.ngOnInit();
        }
      },
      error: error => {
        this.toastr.error('Something Went Wrong', 'Error');
      }

    })
  }


}
