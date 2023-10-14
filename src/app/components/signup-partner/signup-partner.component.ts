import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
// import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-signup-partner',
  templateUrl: './signup-partner.component.html',
  styleUrls: ['./signup-partner.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupPartnerComponent implements OnInit {
  createMiningPartner = {
    refferal_id: ''
  }
  b: string = '';
  constructor(private userService: UserService, private toastr: ToastrService, private activeRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(data => {
      this.b = data['refferId'];
      console.log(this.b);
    })
  }
  partnerSignUpForm = new FormGroup({
    reffered_id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    lname: new FormControl("", [Validators.required]),
    aadhar: new FormControl("", [Validators.required, Validators.maxLength(12),
    Validators.minLength(12)]),
    phone: new FormControl("", [Validators.required, Validators.maxLength(13),
    Validators.minLength(13), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    email: new FormControl("", [Validators.required, Validators.email]),
    address: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    dob: new FormControl("", [Validators.required]),
    nominee_name: new FormControl("", [Validators.required]),
    nominee_aadhar: new FormControl("", [Validators.required,
    Validators.maxLength(12), Validators.minLength(12)]),
    nominee_phone: new FormControl("", [Validators.required, Validators.maxLength(13),
    Validators.minLength(13), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    dop: new FormControl("", [Validators.required]),
    liquidity: new FormControl("", [Validators.required]),
    terms: new FormControl("12 Months", [Validators.required]),
    user_id: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  addPartnerData(form : FormGroup) {
    console.log(form.value)
    this.createMiningPartner.refferal_id = this.partnerSignUpForm.value.user_id + Math.floor(Math.random() * 100000);
    //console.log(this.b);
    let a = '';
    if (this.b === '' || this.b === undefined) {

      a = this.partnerSignUpForm.value.reffered_id;
    }
    else {
      a = this.b
    }

    var data = {

      p_reffered_id: a,
      p_name: this.partnerSignUpForm.value.name,
      p_lname: this.partnerSignUpForm.value.lname,
      p_aadhar: this.partnerSignUpForm.value.aadhar,
      p_phone: this.partnerSignUpForm.value.phone,
      p_email: this.partnerSignUpForm.value.email,
      p_address: this.partnerSignUpForm.value.address,
      p_state: this.partnerSignUpForm.value.state,
      p_dob: this.partnerSignUpForm.value.dob,
      p_nominee_name: this.partnerSignUpForm.value.nominee_name,
      p_nominee_aadhar: this.partnerSignUpForm.value.nominee_aadhar,
      p_nominee_phone: this.partnerSignUpForm.value.nominee_phone,
      p_dop: this.partnerSignUpForm.value.dop,
      p_liquidity: this.partnerSignUpForm.value.liquidity,
      terms: this.partnerSignUpForm.value.terms,
      p_userid: this.partnerSignUpForm.value.user_id,
      p_password: this.partnerSignUpForm.value.password,
      p_refferal_id: this.createMiningPartner.refferal_id
    }

    this.userService.signUpPartner(data).subscribe({
      next: response => {
        if (response) {
          this.toastr.success('Data submitted successfully', 'Success');
        
            // submit form data here
        
            // clear form data after submission
            form.reset();
          
        }
      },
      error: error => {
        this.toastr.error(error.error.message);
      }
    })
  }
}
