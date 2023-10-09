import { Component, OnInit } from '@angular/core';
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
import { allState } from "src/app/components/common/states";

@Component({
  selector: 'app-bd-edit',
  templateUrl: './bd-edit.component.html',
  styleUrls: ['./bd-edit.component.css']
})
export class BdEditComponent implements OnInit {
  states = allState.states;
  distric = []
  bdData = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    gender: "",
    state: "",
    city: "",
    bdId: ''
  };
  constructor(@Inject(MAT_DIALOG_DATA,) public data: any,
    private fb: FormBuilder, private userService: UserService,
    private toastr: ToastrService

  ) {
    console.log(data.gender)
    this.bdData.bdId = data.businessDeveloperId
    this.bdData.gender = data.gender;
    this.bdData.fname = data.fname;
    this.bdData.lname = data.lname;
    this.bdData.email = data.email;
    this.bdData.phone = data.phone;
    this.bdData.gender = data.gender;
    this.bdData.state = data.state;
    
    this.bdData.city = data.businessCity;
    console.log(this.bdData)
    const  city = allState.states.find(state=> state.state === data.state)
    this.distric = city.districts;
  }

  editForm: FormGroup;
  ngOnInit() {
    this.editForm = this.fb.group({
      fname: [this.bdData.fname, Validators.required],
      lname: [this.bdData.lname, Validators.required],
      email: [
        this.bdData.email,
        [Validators.required, Validators.email],
      ],
      phone: [
        this.bdData.phone,
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],
      gender: [this.bdData.gender],
      state: [this.bdData.state],
      city: [this.bdData.city, Validators.required],
    });
  }

  onStateChange(selectedState: string) {
    this.distric = [];
    console.log(selectedState)
    const districts = allState.states.find((state) => state.state === selectedState)
    this.distric = districts.districts;
    console.log(this.distric)
  }

  getErrorMessage() {
    return this.editForm.get("email").hasError("required")
      ? "You must enter a value"
      : this.editForm.get("email").hasError("email")
        ? "Not a valid email"
        : "";
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

  editFormSubmit(editForm:any){
    console.log(editForm.value.phone)
    let data = {
      fname: editForm.value.fname,
      lname: editForm.value.lname,
      email: editForm.value.email,
      phone: editForm.value.phone,
      gender: editForm.value.gender,
      state: editForm.value.state,
      businessCity: editForm.value.city,
      businessDeveloperId: this.bdData.bdId
    }
    console.log(data)
    this.userService.editAndUpdate(data).subscribe({
      next:(res:any)=>{
        this.toastr.success(res.message)
      },
      error:(error=>{
        this.toastr.warning(error.error.message)
      })

    })
  }

}
