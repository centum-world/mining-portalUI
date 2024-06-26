import { Component, OnInit } from "@angular/core";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserService } from "src/app/service/user.service";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { allState } from "src/app/components/common/states";
@Component({
  selector: "app-edit-sho",
  templateUrl: "./edit-sho.component.html",
  styleUrls: ["./edit-sho.component.css"],
})
export class EditShoComponent implements OnInit {
  editForm: FormGroup;
  shoDetails = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    gender: "",
    state: [],
    id: "",
  };
  states = allState.states;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.shoDetails.fname = data.fname;
    this.shoDetails.lname = data.lname;
    this.shoDetails.email = data.email;
    this.shoDetails.phone = data.phone;
    this.shoDetails.gender = data.gender;
    this.shoDetails.state = data.selectedState.split(",");
    this.shoDetails.id = data.stateHandlerId;
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      fname: [this.shoDetails.fname, Validators.required],
      lname: [this.shoDetails.lname, Validators.required],
      email: [this.shoDetails.email, [Validators.required, Validators.email]],
      phone: [
        this.shoDetails.phone,
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],
      gender: [this.shoDetails.gender],
      state: [this.shoDetails.state],
    });
  }

  getErrorMessage() {
    const emailControl = this.editForm.get("email");
    if (emailControl.hasError("required")) {
      return "You must enter a value";
    }
    if (emailControl.hasError("email")) {
      return "Not a valid email";
    }
    return "";
  }

  getErrorFnameMessage() {
    return this.editForm.get("fname").hasError("required")
      ? "You must enter first name"
      : "";
  }

  getErrorLnameMessage() {
    return this.editForm.get("lname").hasError("required")
      ? "You must enter last name"
      : "";
  }

  editFormSubmit(editForm: any) {
    let data = {
      fname: editForm.value.fname,
      lname: editForm.value.lname,
      email: editForm.value.email,
      phone: editForm.value.phone,
      gender: editForm.value.gender,
      selectedState: editForm.value.state,
      stateHandlerId: this.shoDetails.id,
    };
    this.userService.editShoByAdmin(data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }
}
