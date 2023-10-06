import { Component, OnInit,NgModule, Output,EventEmitter  } from "@angular/core";
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
  selector: "app-admin-edit-franchise",
  templateUrl: "./admin-edit-franchise.component.html",
  styleUrls: ["./admin-edit-franchise.component.css"],
})
export class AdminEditFranchiseComponent implements OnInit {

  @Output() okClicked: EventEmitter<any> = new EventEmitter();
  states = allState.states;
  filteredDistricts = []

  editForm: FormGroup;

  franchiseDetails = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    gender: "",
    franchiseState: "",
    franchiseCity: [],
    franchiseId: "",
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.franchiseDetails.fname = data.fname;
    this.franchiseDetails.lname = data.lname;
    this.franchiseDetails.email = data.email;
    this.franchiseDetails.phone = data.phone;
    this.franchiseDetails.gender = data.gender;
    this.franchiseDetails.franchiseId = data.franchiseId;
    this.franchiseDetails.franchiseState = data.franchiseState;
    this.franchiseDetails.franchiseCity = data.franchiseCity.split(",");
    const districts =  allState.states.find((state)=>state.state === data.franchiseState)
    this.filteredDistricts = districts.districts;
    console.log(this.franchiseDetails.franchiseCity)
  }

  ngOnInit() {
    console.log(this.franchiseDetails.fname);
    console.log(this.franchiseDetails.gender);
    console.log(this.franchiseDetails.email);
    console.log(this.franchiseDetails.phone);
    console.log(this.franchiseDetails.franchiseId);
    console.log(this.franchiseDetails.franchiseState);
    console.log(this.franchiseDetails.franchiseCity);

    this.editForm = this.fb.group({
      fname: [this.franchiseDetails.fname, Validators.required],
      lname: [this.franchiseDetails.lname, Validators.required],
      email: [
        this.franchiseDetails.email,
        [Validators.required, Validators.email],
      ],
      phone: [
        this.franchiseDetails.phone,
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],
      gender: [this.franchiseDetails.gender],
      franchiseState: [this.franchiseDetails.franchiseState],
      franchiseCity: [this.franchiseDetails.franchiseCity],
    });
  }

  onFranchiseChange(selectedState: string) {
    this.filteredDistricts=[];
    console.log(selectedState)
    const districts =  allState.states.find((state)=>state.state === selectedState)
    this.filteredDistricts = districts.districts;
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
    console.log(editForm.value, this.franchiseDetails.franchiseId);
    let data = {
      fname: editForm.value.fname,
      lname: editForm.value.lname,
      email: editForm.value.email,
      phone: editForm.value.phone,
      gender: editForm.value.gender,
      franchiseState: editForm.value.franchiseState,
      franchiseCity: editForm.value.franchiseCity,
      franchiseId: this.franchiseDetails.franchiseId,
    };
    this.userService.editFranchiseByAdmin(data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
        this.okClicked.emit();
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }

  
}
