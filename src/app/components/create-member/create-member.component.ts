import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-create-member",
  templateUrl: "./create-member.component.html",
  styleUrls: ["./create-member.component.css"],
})
export class CreateMemberComponent implements OnInit {
  public createMember = {
    refferal_id: "",
  };

  public userExperience = [
    { name: "1 Year" },
    { name: "2 Year" },
    { name: "3 Year" },
    { name: "Morethen 3 year" },
  ];

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router :Router
  ) {}

  //  Add member
  userForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    lname: new FormControl("", [Validators.required]),
    phone: new FormControl("", [
      Validators.required,
      Validators.maxLength(13),
      Validators.minLength(13),
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
    ]),
    address: new FormControl("", [Validators.required]),
    reffered_id: new FormControl("admin123", [Validators.required]),
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
    user_password: new FormControl("", [Validators.required]),
  });

  addMemberData(userForm) {
    var data = {
      m_name: this.userForm.value.name,
      m_lname: this.userForm.value.lname,
      m_phone: this.userForm.value.phone,
      m_add: this.userForm.value.address,
      m_refferid: this.userForm.value.reffered_id,
      m_state: this.userForm.value.state,
      m_email: this.userForm.value.email,
      m_designation: this.userForm.value.designation,
      m_quali: this.userForm.value.qualification,
      m_gender: this.userForm.value.gender,
      m_exp: this.userForm.value.experiance,
      m_salary: this.userForm.value.salary,
      m_dob: this.userForm.value.dob,
      m_doj: this.userForm.value.doj,
      m_userid: this.userForm.value.user_id,
      m_password: this.userForm.value.user_password,
      //reffer_id: this.createMember.refferal_id
    };

    //create member
    this.userService.createMember(data).subscribe({
      next: (result) => {
        if (result) {
          this.toastr.success("Member Created Successfully!", "Success");
          userForm.reset();
        }
      },
      error: (error) => {
        this.toastr.error(error.error.message);
      },
    });
  }

  goBack(){
    this.router.navigate(['/bd-dashboard/home'])
  }

  ngOnInit() {}
}
