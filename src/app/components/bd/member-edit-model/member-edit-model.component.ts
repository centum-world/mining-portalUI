import { Component, OnInit } from "@angular/core";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserService } from "src/app/service/user.service";
import { ToastrService } from "ngx-toastr";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from "@angular/forms";

import { allState } from "../../common/states";

@Component({
  selector: "app-member-edit-model",
  templateUrl: "./member-edit-model.component.html",
  styleUrls: ["./member-edit-model.component.css"],
})
export class MemberEditModelComponent implements OnInit {
  states = allState.states;
  district = [];

  memberData = {
    m_name: "",
    m_lname: "",
    m_email: "",
    m_phone: "",
    m_add: "",
    m_userid: "",
    m_gender: "",
    m_state: "",
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.memberData.m_userid = data.m_userid;
    this.memberData.m_name = data.m_name;
    this.memberData.m_lname = data.m_lname;
    this.memberData.m_email = data.m_email;
    this.memberData.m_phone = data.m_phone;
    this.memberData.m_add = data.m_add;
    this.memberData.m_gender = data.m_gender;
    this.memberData.m_state = data.m_state;
  }

  editForm: FormGroup;

  ngOnInit() {
    this.editForm = this.fb.group({
      m_name: [this.memberData.m_name, Validators.required],
      m_lname: [this.memberData.m_lname, Validators.required],
      m_email: [
        this.memberData.m_email,
        [Validators.required, Validators.email],
      ],
      m_phone: [
        this.memberData.m_phone,
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],
      m_add: [this.memberData.m_add, Validators.required],
      m_gender: [this.memberData.m_gender, Validators.required],
      m_state: [this.memberData.m_state, Validators.required],
    });
  }

  getErrorMessage(control: AbstractControl) {
    if (control.hasError("required")) {
      return "You must enter a value";
    } else if (control.hasError("email")) {
      return "Not a valid email";
    }
    return "";
  }

  editFormSubmit() {
    if (this.editForm.valid) {
      const formData = this.editForm.value;

      // Set the properties in formData to match the expected keys
      formData.m_userid = this.memberData.m_userid;

      this.userService.editMemberByAdmin(formData).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message);
        },
        error: (err) => {
          this.toastr.warning(err.error.message);
        },
      });
    }
  }
}
