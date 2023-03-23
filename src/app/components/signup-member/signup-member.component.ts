import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-signup-member',
  templateUrl: './signup-member.component.html',
  styleUrls: ['./signup-member.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupMemberComponent implements OnInit {

  constructor(private userService: UserService, private toastr: ToastrService, private activeRoute: ActivatedRoute) { }


  public userExperience = [
    { name: '1 Year' },
    { name: '2 Year' },
    { name: '3 Year' },
    { name: 'More then 3 year' }
  ];
  createMember = {
    refferal_id: ''
  }
  b: string = '';
  ngOnInit() {
    this.activeRoute.queryParams.subscribe(data => {
      this.b = data['refferId'];
    })
  }

  signForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required, Validators.maxLength(13),
    Validators.minLength(13), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    address: new FormControl("", [Validators.required]),
    reffered_id: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    designation: new FormControl("", Validators.required),
    qualification: new FormControl("", Validators.required),
    gender: new FormControl("", [Validators.required]),
    experiance: new FormControl("", [Validators.required]),
    salary: new FormControl("", [Validators.required]),
    dob: new FormControl("", [Validators.required]),
    doj: new FormControl("", [Validators.required]),
    user_id: new FormControl("", [Validators.required]),
    user_password: new FormControl("", [Validators.required])

  });

  addMemberData(userForm) {
    this.createMember.refferal_id = this.signForm.value.user_id + Math.floor(Math.random() * 100000);
    var data = {
      m_name: this.signForm.value.name,
      m_phone: this.signForm.value.phone,
      m_add: this.signForm.value.address,
      m_refferid: this.signForm.value.reffered_id,
      m_state: this.signForm.value.state,
      m_email: this.signForm.value.email,
      m_designation: this.signForm.value.designation,
      m_quali: this.signForm.value.qualification,
      m_gender: this.signForm.value.gender,
      m_exp: this.signForm.value.experiance,
      m_salary: this.signForm.value.salary,
      m_dob: this.signForm.value.dob,
      m_doj: this.signForm.value.doj,
      m_userid: this.signForm.value.user_id,
      m_password: this.signForm.value.user_password,
      reffer_id: this.createMember.refferal_id
    }

    this.userService.signUpMember(data).subscribe({
      next: result => {
        if (result) {
          this.toastr.success('Member Created Successfully!', 'Success');
          userForm.reset();
        }
      },
      error: error => {
        this.toastr.error(error.error.message);
      }

    })
  }
}
