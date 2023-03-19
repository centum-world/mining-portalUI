import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-member-details-list',
  templateUrl: './member-details-list.component.html',
  styleUrls: ['./member-details-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MemberDetailsListComponent implements OnInit {


  memberListDetail = [];
  searchText:any;
  constructor(private userService: UserService, private toastr: ToastrService, private datePipe: DatePipe) { }
  token: string = '';
  p: number = 1;
  memberUpdateDetails = {
    name: '',
    phone: '',
    address: '',
    state: '',
    email: '',
    designation: '',
    qualification: '',
    gender: '',
    experience: '',
    salary: '',
    dob: '',
    doj: '',
    user_id: '',
    password: ''
  }

  designationArray = [
    { value: 1, data: 'software_engineer', display: 'Software Engineer' },
    { value: 2, data: 'business_manager', display: 'Business Manager' },
    { value: 3, data: 'full_stack', display: 'Full stack developer' },
    { value: 4, data: 'web_developer', display: 'Web Developer' },

  ];

  selected: string = 'badal';
  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.memberDetail();
  }

  memberDetail() {

    this.userService.fetchMemberDetails().subscribe({
      next: (response: any) => {
        if (response) {
          this.memberListDetail = Object.values(response.data);
        }
      },
      error: error => {
        this.toastr.error('Somthing went wrong', 'Error');
      }
    })

  }
  fetchMemberDetails(id) {
    let data = {
      m_userid: id
    }
    this.userService.fetchMemberDetailsForAdminSingleData(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.memberUpdateDetails.name = response.data[0].m_name;
          this.memberUpdateDetails.phone = response.data[0].m_phone;
          this.memberUpdateDetails.address = response.data[0].m_add;
          this.memberUpdateDetails.state = response.data[0].m_state;
          this.memberUpdateDetails.email = response.data[0].m_email;

          this.memberUpdateDetails.designation = response.data[0].m_designation;
          this.memberUpdateDetails.qualification = response.data[0].m_quali;
          this.memberUpdateDetails.gender = response.data[0].m_gender;
          this.memberUpdateDetails.experience = response.data[0].m_exp;
          this.memberUpdateDetails.salary = response.data[0].m_salary;
          this.memberUpdateDetails.dob = this.datePipe.transform(response.data[0].m_dob, 'yyyy-MM-dd');

          this.memberUpdateDetails.doj = this.datePipe.transform(response.data[0].m_doj, 'yyyy-MM-dd');
          this.memberUpdateDetails.user_id = response.data[0].m_userid;
          this.memberUpdateDetails.password = response.data[0].m_password;
        }
      },
      error: errror => {
        this.toastr.error('Somthing went wrong');
      }
    })

  }
  experianceMember(e) {
    this.memberUpdateDetails.experience = e.target.value;
  }
  changeMemberDegisnation(e) {
    let i = e.target.value;
    if (i === '1') {
      this.memberUpdateDetails.designation = 'software_engineer';
    } else if (i === '2') {
      this.memberUpdateDetails.designation = 'business_manager';
    } else if (i === '3') {
      this.memberUpdateDetails.designation = 'full_stack';
    } else {
      this.memberUpdateDetails.designation = 'web_developer';
    }

  }
  changeMemberQuali(e) {

    this.memberUpdateDetails.qualification = e.target.value;
  }

  changeMemberGender(e) {
    this.memberUpdateDetails.gender = e.target.value;
  }

  updateMemberData() {
    let data = {
      m_name: this.memberUpdateDetails.name,
      m_phone: this.memberUpdateDetails.phone,
      m_add: this.memberUpdateDetails.address,
      m_state: this.memberUpdateDetails.state,
      m_email: this.memberUpdateDetails.email,
      m_salary: this.memberUpdateDetails.salary,
      m_dob: this.memberUpdateDetails.dob,
      m_doj: this.memberUpdateDetails.doj,
      m_userid: this.memberUpdateDetails.user_id,

      m_gender: this.memberUpdateDetails.gender,
      m_designation: this.memberUpdateDetails.designation,
      m_exp: this.memberUpdateDetails.experience,
      m_quali: this.memberUpdateDetails.qualification
    }
    this.userService.updateMemberDetailsFromAdmin(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.toastr.success('Update successfully', 'Success');
          this.ngOnInit();
        }
      },
      error: error => {
        this.toastr.error('Something went wrong', 'Error');
      }
    })

  }

}
