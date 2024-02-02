// mining-signup.component.ts

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/service/user.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-mining-signup",
  templateUrl: "./mining-signup.component.html",
  styleUrls: ["./mining-signup.component.css"],
})
export class MiningSignupComponent implements OnInit, AfterViewInit {
  @ViewChild("phoneNumberInput", { static: true }) phoneNumberInput: ElementRef;
  @ViewChild("phoneNumberInputNominee", { static: true })
  phoneNumberInputNominee: ElementRef;
  passwordFieldType: string = "password";
  showPasswordIcon: string = "visibility";
  role: "";
  aadharImage: File | null = null;
  aadharBackImage: File | null = null;
  panImage: File|null = null;
  aadharImageName: string = "";
  backAadharImageName: string = "";
  panImageName: string = "";
  createMiningPartner = {
    refferal_id: "",
  };
  spin = false;
  change = false;
  countryCode:"";
  nomineeCountryCode :"";
  partnerSignUpForm: FormGroup;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.partnerSignUpForm = this.formBuilder.group({
      reffered_id: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      lname: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
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
  }

  addPartnerData(form: FormGroup) {
    this.spin = true;
    this.createMiningPartner.refferal_id = this.partnerSignUpForm.value.user_id + Math.floor(Math.random() * 100000);
    console.log(this.createMiningPartner.refferal_id)
    console.log(
      this.partnerSignUpForm.value.reffered_id,
      this.role,
      this.partnerSignUpForm.value.name,
      this.partnerSignUpForm.value.lname,
      this.partnerSignUpForm.value.email,
      this.partnerSignUpForm.value.phone,
      this.partnerSignUpForm.value.aadhar,
      this.partnerSignUpForm.value.address,
      this.partnerSignUpForm.value.state,
      this.partnerSignUpForm.value.dob,
      this.partnerSignUpForm.value.dop,
      this.partnerSignUpForm.value.nominee_name,
      this.partnerSignUpForm.value.nominee_aadhar,
      this.partnerSignUpForm.value.nominee_phone,
      this.partnerSignUpForm.value.liquidity,
      this.partnerSignUpForm.value.terms,
      this.partnerSignUpForm.value.user_id,
      this.partnerSignUpForm.value.password,
      this.aadharBackImage,
      this.aadharImage,
      this.panImage
    );

    const formData = new FormData();
    formData.append('p_reffered_id', this.partnerSignUpForm.value.reffered_id);
    formData.append('p_name', this.partnerSignUpForm.value.name);
    formData.append('p_lname', this.partnerSignUpForm.value.lname);
    formData.append('p_aadhar', this.partnerSignUpForm.value.aadhar);
    formData.append('p_phone','+' + this.countryCode + this.partnerSignUpForm.value.phone);
    formData.append('p_email',  this.partnerSignUpForm.value.email);
    formData.append('p_address', this.partnerSignUpForm.value.address);
    formData.append('p_state',this.partnerSignUpForm.value.state);
    formData.append('p_dob',this.partnerSignUpForm.value.dob);
    formData.append('p_nominee_name', this.partnerSignUpForm.value.nominee_name);
    formData.append('p_nominee_aadhar', this.partnerSignUpForm.value.nominee_aadhar);
    formData.append('p_nominee_phone','+' + this.nomineeCountryCode + this.partnerSignUpForm.value.nominee_phone);
    formData.append('p_dop',this.partnerSignUpForm.value.dop);
    formData.append('p_liquidity',this.partnerSignUpForm.value.liquidity);
    formData.append('terms', "12 Months");
    formData.append('p_userid', this.partnerSignUpForm.value.user_id);
    formData.append('p_password', this.partnerSignUpForm.value.password);
    formData.append('p_refferal_id', this.createMiningPartner.refferal_id)
    formData.append('adhar_front_side', this.aadharImage);
    formData.append('adhar_back_side', this.aadharBackImage);
    formData.append('panCard',this.panImage);
    formData.append('role',this.role);
  
    this.userService.signUpPartner(formData).subscribe({
      next: response => {
        if (response) {
          this.toastr.success('Data submitted successfully', 'Success');
            form.reset();
            this.spin = false;
        }
      },
      error: error => {
        this.spin = false;
        this.toastr.error(error.error.message);
      }
    })


  }

  ngOnInit() {}

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
    if(fileSelected === 'front'){
      const selectedFile: File = event.target.files[0];
      if (selectedFile) {
        this.aadharImage = selectedFile
        console.log("Selected File:", this.aadharImage , fileSelected);
      }
    }
    if(fileSelected === 'back'){
      const selectedFile: File = event.target.files[0];
      if (selectedFile) {
        this.aadharBackImage = selectedFile
        console.log("Selected File:", this.aadharBackImage , fileSelected);
      }
    }

    if(fileSelected === 'pan'){
      const selectedFile: File = event.target.files[0];
      if (selectedFile) {
        this.panImage = selectedFile
        console.log("Selected File:", this.panImage , fileSelected);
      }
    }    
  }

  loginPage(){
    this.change = !this.change;
  }
}