import { Component, OnInit } from "@angular/core";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
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
  selector: "app-edit-franchise",
  templateUrl: "./edit-franchise.component.html",
  styleUrls: ["./edit-franchise.component.css"],
})
export class EditFranchiseComponent implements OnInit {
  states = allState.states;
  distric = []
  franchiseData = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    gender: "",
    state: "",
    city: [],
  };
  gender: "";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.gender = data.gender;
    this.franchiseData.fname = data.fname;
    this.franchiseData.lname = data.lname;
    this.franchiseData.email = data.email;
    this.franchiseData.phone = data.phone;
    this.franchiseData.gender = data.gender;
    this.franchiseData.state = data.franchiseState;
    this.franchiseData.city = data.franchiseCity.split(",");
    const districts =  allState.states.find((state)=>state.state === data.franchiseState)
    this.distric = districts.districts;
    console.log(this.franchiseData.city)
  }
  editForm: FormGroup;
  ngOnInit() {
    console.log(this.franchiseData.state);
    this.editForm = this.fb.group({
      fname: [this.franchiseData.fname, Validators.required],
      lname: [this.franchiseData.lname, Validators.required],
      email: [
        this.franchiseData.email,
        [Validators.required, Validators.email],
      ],
      phone: [
        this.franchiseData.phone,
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],
      gender: [this.franchiseData.gender],
      state: [this.franchiseData.state],
      city: [[this.franchiseData.city], Validators.required],
    });
  }

  onStateChange(selectedState: string){
    this.distric=[];
    console.log(selectedState)
    const districts =  allState.states.find((state)=>state.state === selectedState)
    this.distric = districts.districts;
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

  editFormSubmit(form: FormGroup){
    console.log(form.value)
  }

  
}
