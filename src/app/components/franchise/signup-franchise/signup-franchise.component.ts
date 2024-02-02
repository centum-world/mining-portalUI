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
  FormGroupDirective,
  NgForm,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/service/user.service";
import { ActivatedRoute } from "@angular/router";
import { ErrorStateMatcher } from "@angular/material/core";
import { allState } from "../../common/states";

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
  selector: 'app-signup-franchise',
  templateUrl: './signup-franchise.component.html',
  styleUrls: ['./signup-franchise.component.css']
})
export class SignupFranchiseComponent implements OnInit,AfterViewInit {

  @ViewChild("phoneNumberInput", { static: false }) phoneNumberInput: ElementRef;

  creatingAccount: boolean = false;

  passwordFieldType: string = "password";
  showPasswordIcon: string = "visibility";
  states = allState.states.map((item) => item.state);
  cities = [];
  // role: "";
  aadharImage: File | null = null;
  aadharBackImage: File | null = null;
  panImage: File|null = null;
  aadharImageName: string = "";
  backAadharImageName: string = "";
  panImageName: string = "";
  createFranchise = {
    refferal_id: "",
  };
  // spin = false;
  change = false;
  countryCode:"";
  franchiseSignUpForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.franchiseSignUpForm = this.formBuilder.group({
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
      gender: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      district: new FormControl("", [Validators.required]),
      user_id: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  onStateChange(){
    console.log();
     const selectedState = this.franchiseSignUpForm.get("state").value;
    const selectedStateObj = allState.states.find(
      (state) => state.state === selectedState
    );
    this.cities = selectedStateObj.districts;
  }

  addFranchiseData(form: FormGroup) {
    this.creatingAccount = true;
    this.createFranchise.refferal_id = this.franchiseSignUpForm.value.user_id + Math.floor(Math.random() * 100000);
    console.log(this.createFranchise.refferal_id)
    console.log(
      this.franchiseSignUpForm.value.reffered_id,
      this.franchiseSignUpForm.value.name,
      this.franchiseSignUpForm.value.lname,
      this.franchiseSignUpForm.value.email,
      this.franchiseSignUpForm.value.phone,
      this.franchiseSignUpForm.value.gender,
      this.franchiseSignUpForm.value.state,
      this.franchiseSignUpForm.value.district,
      this.franchiseSignUpForm.value.user_id,
      this.franchiseSignUpForm.value.password,
      this.aadharBackImage,
      this.aadharImage,
      this.panImage
    );

    const formData = new FormData();
    formData.append('referredId', this.franchiseSignUpForm.value.reffered_id);
    formData.append('fname', this.franchiseSignUpForm.value.name);
    formData.append('lname', this.franchiseSignUpForm.value.lname);
    formData.append('phone','+' + this.countryCode + this.franchiseSignUpForm.value.phone);
    formData.append('email',  this.franchiseSignUpForm.value.email);
    formData.append('gender',this.franchiseSignUpForm.value.gender);
    formData.append('franchiseState',this.franchiseSignUpForm.value.state);
    formData.append('franchiseCity',this.franchiseSignUpForm.value.district);
    formData.append('franchiseId', this.franchiseSignUpForm.value.user_id);
    formData.append('password', this.franchiseSignUpForm.value.password);
    formData.append('adhar_front_side', this.aadharImage);
    formData.append('adhar_back_side', this.aadharBackImage);
    formData.append('panCard',this.panImage);

    console.log(formData,'126')
  
    this.userService.createFranchise(formData).subscribe({
      next: response => {
        if (response) {
         
          this.toastr.success('Data submitted successfully', 'Success');
            form.reset();
            this.creatingAccount = false;
            // this.spin = false;
        }
      },
      error: error => {
        // this.spin = false;
        this.creatingAccount = false;
        this.toastr.error(error.error.message);
      }
    })


  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.phoneNumberInput) {
      const inputElement = this.phoneNumberInput.nativeElement;
      const iti = intlTelInput(inputElement, {
        separateDialCode: true,
        nationalMode: false,
      });
      iti.setCountry("IN");
      setTimeout(() => {
        const selectedCountryData = iti.getSelectedCountryData();
        this.countryCode = selectedCountryData.dialCode;
      }, 500);
    } else {
      console.error('phoneNumberInput is not initialized or undefined.');
    }
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
