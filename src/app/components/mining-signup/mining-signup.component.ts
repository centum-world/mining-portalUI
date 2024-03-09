// mining-signup.component.ts

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormGroupDirective,
  NgForm,
  AbstractControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/service/user.service";
import { ActivatedRoute } from "@angular/router";
import { ShareService } from "src/app/shareService/share.service";
import { ErrorStateMatcher } from "@angular/material/core";
import { allState } from "../common/states";
import { MatDialog } from "@angular/material";
import { MatDialogConfig } from "@angular/material";
import { CradentilsComponent } from "../common/cradentils/cradentils.component";

export function fileSizeValidator(maxSizeInKB: number) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value) {
      const file: File = control.value;
      const fileSizeInKB = file.size / 1024; // Convert bytes to kilobytes
      console.log('File Size:', fileSizeInKB);
      if (fileSizeInKB > maxSizeInKB) {
        return { 'fileSizeExceeded': true };
      }
    }
    return null;
  };
}



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

@Component({
  selector: "app-mining-signup",
  templateUrl: "./mining-signup.component.html",
  styleUrls: ["./mining-signup.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class MiningSignupComponent implements OnInit, AfterViewInit {
  @ViewChild("phoneNumberInput", { static: true }) phoneNumberInput: ElementRef;
  @ViewChild("phoneNumberInputNominee", { static: true }) phoneNumberInputNominee: ElementRef;
  cradentialID:string="";
  cradentialPassword:string="";
  passwordFieldType: string = "password";
  showPasswordIcon: string = "visibility_off";
  states = allState.states.map((item) => item.state);
  role: "";
  aadharImage: File | null = null;
  aadharBackImage: File | null = null;
  panImage: File | null = null;
  aadharImageName: string = "";
  backAadharImageName: string = "";
  panImageName: string = "";
  privacy = false;
  createMiningPartner = {
    refferal_id: "",
  };
  spin = false;
  change = false;
  pagename: String = "Sign in your account";
  countryCode: "";
  nomineeCountryCode: "";
  memberOfficialId: string = "";
  partnerSignUpForm: FormGroup;
  partnerLoginForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private shareService: ShareService,
    private dialog: MatDialog
  ) {
    this.partnerSignUpForm = this.formBuilder.group({
      aadharImage: [null, [fileSizeValidator(2048)]], // Set 2 as the maximum allowed size in MB
      aadharBackImage: [null, [fileSizeValidator(2048)]],
      panImage: [null, [fileSizeValidator(2048)]],
      reffered_id: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      lname: new FormControl("", [Validators.required]),
      email: new FormControl("", [ Validators.email]),
      phone: new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
      ]),
      aadhar: new FormControl("", [
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(12),
      ]),
      address: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      dob: new FormControl("", [Validators.required]),
      dop: new FormControl("", [Validators.required]),
      nominee_name: new FormControl("", [Validators.required]),
      nominee_aadhar: new FormControl("", [
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(12),
      ]),
      nominee_phone: new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
      ]),
      liquidity: new FormControl("", [Validators.required]),
      terms: [{ value: "12 Months", disabled: true }],
      user_id: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });

    this.partnerLoginForm = this.formBuilder.group({
      luser_id: new FormControl("", [Validators.required]),
      lpassword: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {
    
  }

  onStateChange() {
    console.log();
    const selectedState = this.partnerSignUpForm.get("state").value;
    const selectedStateObj = allState.states.find(
      (state) => state.state === selectedState
    );
  }

  onRoleChange(event: any): void {
    const updatedValue = event.value;
    this.setRefferedIdValue(updatedValue);
  }

  setRefferedIdValue(selectedRole: string): void {
    const referredIdControl = this.partnerSignUpForm.get("reffered_id");
    console.log(referredIdControl);

    if (referredIdControl) {
      if (selectedRole === "OFFICIAL") {
        referredIdControl.setValue("RO8336");
        referredIdControl.disable();
        this.memberOfficialId = referredIdControl.value;
      } else {
        referredIdControl.setValue("");
        referredIdControl.enable();
        this.memberOfficialId = "";
      }
    } else {
      console.error("referred_id control not found in the form group");
    }
  }

  addPartnerData(form: FormGroup) {
    if (
      this.partnerSignUpForm.get('aadharImage').hasError('fileSizeExceeded') ||
      this.partnerSignUpForm.get('aadharBackImage').hasError('fileSizeExceeded') ||
      this.partnerSignUpForm.get('panImage').hasError('fileSizeExceeded')
    ) {
      // Prevent form submission if any file size exceeds the limit
      return;
    }
    this.spin = true;
    this.createMiningPartner.refferal_id =
      this.partnerSignUpForm.value.user_id + Math.floor(Math.random() * 100000);
    console.log(this.partnerSignUpForm.value.phone);

    const originalDateStrDob = this.partnerSignUpForm.value.dob;
    const dateObj = new Date(originalDateStrDob);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(dateObj.getDate()).padStart(2, "0");
    const newDobFormat = `${year}-${month}-${day}`;

    // ---------------------Doj-----------------
    const originalDateStrDop = this.partnerSignUpForm.value.dop;
    const dateObj1 = new Date(originalDateStrDop);
    const yearDop = dateObj1.getFullYear();
    const monthDop = String(dateObj1.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const dayDop = String(dateObj1.getDate()).padStart(2, "0");
    const newDopFormat = `${yearDop}-${monthDop}-${dayDop}`;

    const formData = new FormData();
    formData.append(
      "p_reffered_id",
      this.memberOfficialId
        ? this.memberOfficialId
        : this.partnerSignUpForm.value.reffered_id
    );
    formData.append("p_name", this.partnerSignUpForm.value.name);
    formData.append("p_lname", this.partnerSignUpForm.value.lname);
    formData.append("p_aadhar", this.partnerSignUpForm.value.aadhar);
    // formData.append('p_phone','+' + this.countryCode + this.partnerSignUpForm.value.phone.replace(/\s/g, ''));
    formData.append(
      "p_phone",
      this.partnerSignUpForm.value.phone.replace(/\s/g, "")
    );
    formData.append("p_email", this.partnerSignUpForm.value.email);
    formData.append("p_address", this.partnerSignUpForm.value.address);
    formData.append("p_state", this.partnerSignUpForm.value.state);
    formData.append("p_dob", newDobFormat);
    formData.append(
      "p_nominee_name",
      this.partnerSignUpForm.value.nominee_name
    );
    formData.append(
      "p_nominee_aadhar",
      this.partnerSignUpForm.value.nominee_aadhar
    );
    formData.append(
      "p_nominee_phone",
      this.partnerSignUpForm.value.nominee_phone.replace(/\s/g, "")
    );
    // formData.append('p_nominee_phone','+' + this.nomineeCountryCode + this.partnerSignUpForm.value.nominee_phone.replace(/\s/g, ''));
    formData.append("p_dop", newDopFormat);
    formData.append("p_liquidity", this.partnerSignUpForm.value.liquidity);
    formData.append("terms", "12 Months");
    formData.append("p_userid", this.partnerSignUpForm.value.user_id);
    formData.append("p_password", this.partnerSignUpForm.value.password);
    this.cradentialID = this.partnerSignUpForm.value.user_id;
    this.cradentialPassword = this.partnerSignUpForm.value.password;
    formData.append("p_refferal_id", this.createMiningPartner.refferal_id);
    formData.append("adhar_front_side", this.aadharImage);
    formData.append("adhar_back_side", this.aadharBackImage);
    formData.append("panCard", this.panImage);
    formData.append("role", this.role);

    this.userService.signUpPartner(formData).subscribe({
      next: (response) => {
        if (response) {
          localStorage.setItem("login", "true");
          this.shareService.setPartnerId(response.data.p_userid);
          this.shareService.setMiningPartnerRefferId(
            response.data.p_refferal_id
          );
          this.shareService.setMiningPartnerLiquidity(
            response.data.p_liquidity
          );
          this.shareService.setToken(response.token);
          this.toastr.success("SignUP successfully", "Success");
          this.cradentialsModal();
          this.change = true;
          this.router.navigate(["miningdashboard"]);
          form.reset();
          // this.spin = false;
        }
      },
      error: (error) => {
        this.spin = false;
        this.toastr.error(error.error.message);
      },
    });
  }

  cradentialsModal() {
    let config: MatDialogConfig = {
      panelClass: "cradentialDialogClass",
      data:{
        userID : this.cradentialID,
        password: this.cradentialPassword,
        userType: "PARTNER",
      }
    };
    const dialogRef = this.dialog.open(CradentilsComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
  }

  loginPartner(form: FormGroup) {
    console.log(
      this.partnerLoginForm.value.luser_id,
      this.partnerLoginForm.value.lpassword
    );
    let data = {
      p_userid: this.partnerLoginForm.value.luser_id,
      p_password: this.partnerLoginForm.value.lpassword,
    };

    this.userService.partnerLogin(data).subscribe({
      next: (response: any) => {
        if (response) {
          localStorage.setItem("login", "true");
          this.spin = false;
          this.shareService.setPartnerId(response.data[0].p_userid);
          this.shareService.setMiningPartnerRefferId(
            response.data[0].p_refferal_id
          );
          this.shareService.setMiningPartnerLiquidity(
            response.data[0].p_liquidity
          );
          this.shareService.setToken(response.token);
          this.toastr.success("Logged In Successfully", "success");
          this.router.navigate(["miningdashboard"]);
          setTimeout(function () {
            window.location.reload();
          }, 100);
        }
      },
      error: (error) => {
        this.spin = false;
        this.toastr.error(error.error.message, "Error");
      },
    });
  }

  

  ngAfterViewInit() {
    const inputElement = this.phoneNumberInput.nativeElement;
    const iti = intlTelInput(inputElement, {
      separateDialCode: true,
      nationalMode: false,
    });
    console.log("IntlTelInput instance:", iti);
    iti.setCountry("IN");
    setTimeout(() => {
      const selectedCountryData = iti.getSelectedCountryData();
      console.log("Selected Country Code:", selectedCountryData.dialCode);
      this.countryCode = selectedCountryData.dialCode;
    }, 500);

    const inputElementNominee = this.phoneNumberInputNominee.nativeElement;
    const itiNominee = intlTelInput(inputElementNominee, {
      separateDialCode: true,
      nationalMode: false,
    });
    itiNominee.setCountry("IN");
    setTimeout(() => {
      const selectedCountryDataNominee = itiNominee.getSelectedCountryData();
      console.log(
        "Selected Country Code (Nominee):",
        selectedCountryDataNominee.dialCode
      );
      this.nomineeCountryCode = selectedCountryDataNominee.dialCode;
    }, 500);
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === "password" ? "text" : "password";
    this.showPasswordIcon =
      this.showPasswordIcon === "visibility" ? "visibility_off" : "visibility";
  }

  onFileSelected(event: any, fileSelected: any): void {
    if (fileSelected === "front") {
      const selectedFile: File = event.target.files[0];
      if (selectedFile) {
        this.aadharImage = selectedFile;
        this.partnerSignUpForm.get('aadharImage').setValue(selectedFile);
        console.log("Selected File:", this.aadharImage, fileSelected);
      }
    }
    if (fileSelected === "back") {
      const selectedFile: File = event.target.files[0];
      if (selectedFile) {
        this.aadharBackImage = selectedFile;
        this.partnerSignUpForm.get('aadharBackImage').setValue(selectedFile);
        console.log("Selected File:", this.aadharBackImage, fileSelected);
      }
    }

    if (fileSelected === "pan") {
      const selectedFile: File = event.target.files[0];
      if (selectedFile) {
        this.panImage = selectedFile;
        this.partnerSignUpForm.get('panImage').setValue(selectedFile);
        console.log("Selected File:", this.panImage, fileSelected);
      }
    }
  }

  tabChanged(event: any): void {
    console.log("Tab changed:", event.tab.textLabel);
    if (event.tab.textLabel === "Login") {
      this.pagename = "Sign in your account";
    } else {
      this.pagename = "Sign up your account";
    }
  }

  gotoDhasboard() {
    window.open("http://centumworldrig.com", "_blank");
  }

  privacyPolicy() {
    this.router.navigate(["/privacy-policy"]);
  }

  handleChange(event: any) {
    // Handle the checkbox change here
    if (event.checked) {
      this.privacy = true;
    } else {
      this.privacy = false;
    }
  }
}
