import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-member-portal-details",
  templateUrl: "./member-portal-details.component.html",
  styleUrls: ["./member-portal-details.component.css"],
})
export class MemberPortalDetailsComponent implements OnInit {
  memberIdDetails: string;
  memberDetails: any;
  memberBankDetails: any;

  popupData = {
    email: "",
    name: "",
    address: "",
    state: "",
    designation: "",
    qualification: "",
    exp: "",
    gender: "",
    dob: "",
    password: "",
    phone: "",
  };
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.callApiMemberProfileDetails();
    this.callApiMemberBankDetails();
  }
  callApiMemberProfileDetails() {
    let memberIdDetails = localStorage.getItem("userdetail");
    let data = {
      m_userid: memberIdDetails,
    };
    this.userService.fetchMemberPortalDetails(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.memberDetails = Object.values(response.data);
          this.popupData.name = this.memberDetails[0].m_name;
          this.popupData.phone = this.memberDetails[0].m_phone;
          this.popupData.address = this.memberDetails[0].m_add;
          this.popupData.email = this.memberDetails[0].m_email;
          this.popupData.designation = this.memberDetails[0].m_designation;
          this.popupData.qualification = this.memberDetails[0].m_quali;
          this.popupData.gender = this.memberDetails[0].m_gender;
          this.popupData.exp = this.memberDetails[0].m_exp;
          this.popupData.dob = this.datePipe.transform(
            this.memberDetails[0].m_dob,
            "yyyy-MM-dd"
          );
          this.popupData.password = this.memberDetails[0].m_password;
          this.popupData.state = this.memberDetails[0].m_state;
        }
      },
      error: (error) => {
        this.toastr.error("Something went wrong", "Error");
      },
    });
  }

  callApiMemberBankDetails() {
    let data = {
      user_id: localStorage.getItem("userdetail"),
    };
    this.userService.fetchMemberBankDetails(data).subscribe((response: any) => {
      if (response) {
        this.memberBankDetails = Object.values(response.data);
      }
    });
  }

  changeMemberQuali(e) {
    this.popupData.qualification = e.target.value;
  }

  changeMemberGender(e) {
    this.popupData.gender = e.target.value;
  }
  updateMemberData() {
    let data = {
      m_userid: localStorage.getItem("userdetail"),
      m_email: this.popupData.email,
      m_name: this.popupData.name,
      m_phone: this.popupData.phone,
      m_add: this.popupData.address,
      m_state: this.popupData.state,
      m_quali: this.popupData.qualification,
      m_dob: this.popupData.dob,
      m_gender: this.popupData.gender,
    };

    this.userService.updateMemberData(data).subscribe({
      next: (response) => {
        if (response) {
          this.toastr.success("Data Updated Successfully", "Success");
          this.ngOnInit();
        }
      },
      error: (error) => {
        this.toastr.error("Something Went Wrong", "Error");
      },
    });
  }
}
