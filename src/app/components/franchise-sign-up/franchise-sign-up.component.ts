import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { allState } from "../common/states";

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormGroupDirective,
  NgForm,
  ValidatorFn,
  AbstractControl,
} from "@angular/forms";

import { ErrorStateMatcher } from "@angular/material/core";
import { UserService } from "src/app/service/user.service";
import { ToastrService } from "ngx-toastr";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

function mobileNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = /^\d{10}$/.test(control.value);
    return isValid ? null : { invalidMobileNumber: { value: control.value } };
  };
}

@Component({
  selector: "app-franchise-sign-up",
  templateUrl: "./franchise-sign-up.component.html",
  styleUrls: ["./franchise-sign-up.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class FranchiseSignUpComponent implements OnInit {
  passwordFieldType: string = "password"; // Initial type is 'password'
  showPasswordIcon: string = "visibility"; 
  states = allState.states.map((item) => item.state);
  cities = [];

  ngOnInit() {
    console.log(allState.states);
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === "password" ? "text" : "password";
    this.showPasswordIcon =
      this.showPasswordIcon === "visibility" ? "visibility_off" : "visibility";
  }

  stateSignUpForm: FormGroup;
  referralFormControl = new FormControl("", [Validators.required]);
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  nameFormControl = new FormControl("", [Validators.required]);
  lastNameFormControl = new FormControl("", [Validators.required]);
  mobileFormControl = new FormControl("", [
    Validators.required,
    mobileNumberValidator(),
  ]);
  genderFormControl = new FormControl("", [Validators.required]);
  adharFrontControl = new FormControl(null, [
    Validators.required, // Custom file type validator
  ]);
  adharBackControl = new FormControl(null, [
    Validators.required, // Custom file type validator
  ]);
  panControl = new FormControl(null, [
    Validators.required, // Custom file type validator
  ]);
  fileTypeInvalid = false;
  fileTypeInvalidPanCard = false;
  stateIdFormControl = new FormControl("", [Validators.required]);
  passwordFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(8),
  ]);

  matcher = new MyErrorStateMatcher();

  

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.stateSignUpForm = this.fb.group({
      referralId: this.referralFormControl,
      fname: this.nameFormControl,
      lname: this.lastNameFormControl,
      email: this.emailFormControl,
      phone: this.mobileFormControl,
      gender: this.genderFormControl,
      state: ['', Validators.required],
      district: ['', Validators.required],
      aadhar: this.adharFrontControl,
      aadharBack: this.adharBackControl,
      pan: this.panControl,
      stateHandlerId: this.stateIdFormControl,
      password: this.passwordFormControl,
    });
  }

  onFileSelected(event: any, fileType: string) {
    const file = event.target.files[0];
    if (fileType === "adharFrontControl") {
      this.adharFrontControl.setValue(file);
      this.fileTypeInvalid =
        !file.type.match("image/jpeg") && !file.type.match("image/png");
    } else  if (fileType === "adharBackControl") {
      this.adharBackControl.setValue(file);
      this.fileTypeInvalid =
        !file.type.match("image/jpeg") && !file.type.match("image/png");
    }
    else if (fileType === "panControl") {
      this.panControl.setValue(file);
      this.fileTypeInvalidPanCard =
        !file.type.match("image/jpeg") && !file.type.match("image/png");
    }
  }

  onStateChange(){
    console.log();
     const selectedState = this.stateSignUpForm.get("state").value;
    const selectedStateObj = allState.states.find(
      (state) => state.state === selectedState
    );
    this.cities = selectedStateObj.districts;
  }

  addPartnerData(form: FormGroup) {
    console.log("Form submitted:", form.value.referralId);
    console.log("fname:", form.value.fname);
    console.log("lname:", form.value.lname);
    console.log("phone:", form.value.phone);
    console.log("email:", form.value.email);
    console.log("gender:", form.value.gender);
    console.log("selectedState:", form.value.state);
    console.log("selectedCity:", form.value.district);
    console.log("adharFRontCard:", form.value.aadhar);
    console.log("adharBackCard:", form.value.aadharBack);
    console.log("panCard:", form.value.pan);
    console.log("stateHandlerId:", form.value.stateHandlerId);
    console.log("password:", form.value.password);

    const formData = new FormData();
    formData.append("referredId", form.value.referralId);
    formData.append("fname", form.value.fname);
    formData.append("lname", form.value.lname);
    formData.append("phone", form.value.phone);
    formData.append("email", form.value.email);
    formData.append("gender", form.value.gender);
    formData.append("franchiseState", form.value.state);
    formData.append("franchiseCity", form.value.district);
    formData.append("adhar_front_side", form.value.aadhar);
    formData.append("adhar_back_side", form.value.aadharBack);
    formData.append("panCard", form.value.pan);
    formData.append("franchiseId", form.value.stateHandlerId);
    formData.append("password", form.value.password);

    this.userService.createFranchise(formData).subscribe({
      next: (response) => {
        if (response) {
          console.log(response);
          form.reset();
          this.toastr.success(response.message);
        }
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message);
      },
    });
  }
}
