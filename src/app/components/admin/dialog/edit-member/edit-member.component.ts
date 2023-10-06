import { Component, OnInit } from '@angular/core';
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from "@angular/forms";

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent implements OnInit {
  editForm: FormGroup;
  memberDetails = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    gender: "",
    add: "",
    id: ""
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private userService: UserService, private toastr: ToastrService, private dialogRef: MatDialogRef<EditMemberComponent>) {
    console.log(data.m_userid)
    this.memberDetails.fname = data.m_name;
    this.memberDetails.lname = data.m_lname;
    this.memberDetails.email = data.m_email;
    this.memberDetails.phone = data.m_phone;
    this.memberDetails.gender = data.m_gender;
    this.memberDetails.add = data.m_add
    this.memberDetails.id = data.m_userid;
  }

  ngOnInit() {
    console.log(this.memberDetails.gender,)
    this.editForm = this.fb.group({
      fname: [this.memberDetails.fname, Validators.required],
      lname: [this.memberDetails.lname, Validators.required],
      email: [
        this.memberDetails.email,
        [Validators.required, Validators.email],
      ],
      phone: [
        this.memberDetails.phone,
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],
      gender: [this.memberDetails.gender],
      add: [this.memberDetails.add]
    })
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
    return this.editForm.get("fname").hasError("required") ? "You must enter first name" : "";
  }

  getErrorLnameMessage() {
    return this.editForm.get("lname").hasError("required") ? "You must enter last name" : "";
  }
  getErrorAddressMessage(){
    
  }

  editFormSubmit(editForm: any) {
    console.log(editForm.value, this.memberDetails.id)
    let data = {
      m_name: editForm.value.fname,
      m_lname: editForm.value.lname,
      m_email: editForm.value.email,
      m_phone: editForm.value.phone,
      m_gender: editForm.value.gender,
      m_add: editForm.value.add,
      m_userid: this.memberDetails.id
    }
    this.userService.editMemberByAdmin(data).subscribe({
      next: (res: any) => {
        this.dialogRef.close();
        this.toastr.success(res.message)
      },
      error: (err) => {
        this.toastr.error(err.error.message)
      }
    })

  }

}
