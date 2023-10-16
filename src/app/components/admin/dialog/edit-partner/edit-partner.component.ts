import { Component, OnInit } from '@angular/core';
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { allState } from 'src/app/components/common/states';

@Component({
  selector: 'app-edit-partner',
  templateUrl: './edit-partner.component.html',
  styleUrls: ['./edit-partner.component.css']
})
export class EditPartnerComponent implements OnInit {
  editForm: FormGroup;
  partnerDetails = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    add: "",
    aadhar: "",
    nomineeName: "",
    nomineeAadhar: "",
    nomineePhone: "",
    state: [],
    dob: "",
    id: ""
  }
  states = allState.states;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<EditPartnerComponent>,
    private datePipe: DatePipe
  ) {
    this.partnerDetails.fname = data.p_name;
    this.partnerDetails.lname = data.p_lname;
    this.partnerDetails.email = data.p_email;
    this.partnerDetails.phone = data.p_phone;
    this.partnerDetails.add = data.p_address;
    this.partnerDetails.aadhar = data.p_aadhar;
    this.partnerDetails.dob = this.formatISODate(data.p_dob);
    this.partnerDetails.state = data.p_state
    this.partnerDetails.id = data.p_userid;
  }

  ngOnInit() {

    this.editForm = this.fb.group({
      fname: [this.partnerDetails.fname, Validators.required],
      lname: [this.partnerDetails.lname, Validators.required],
      email: [
        this.partnerDetails.email,
        [Validators.required, Validators.email],
      ],
      phone: [
        this.partnerDetails.phone,
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],
      add: [this.partnerDetails.add],
      aadhar: [this.partnerDetails.aadhar],
      dob: [this.partnerDetails.dob],
      state:[this.partnerDetails.state]
    });
  }
  

  private formatISODate(isoDate: string): string {
    return this.datePipe.transform(isoDate, 'yyyy-MM-dd') || '';
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
    console.log(editForm.value)
    let data = {
      p_name: editForm.value.fname,
      p_lname: editForm.value.lname,
      p_email: editForm.value.email,
      p_phone: editForm.value.phone,
      p_address: editForm.value.add,
      p_aadhar:editForm.value.aadhar,
      p_dob:editForm.value.dob,
      p_state:editForm.value.state,
      p_userid: this.partnerDetails.id
    };
    this.userService.updatePartnerData(data).subscribe({
      next: (res: any) => {
        this.dialogRef.close();
        this.toastr.success(res.message)
      },
      error: (err) => {
        this.toastr.error(err.error.message)
      }
    });
  }
}
