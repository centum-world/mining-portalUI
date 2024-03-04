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
  AbstractControl
  
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/service/user.service";
import { ActivatedRoute } from "@angular/router";
import { ErrorStateMatcher } from "@angular/material/core";
import { allState } from "../../common/states";
import { ShareService } from "src/app/shareService/share.service";
import { MatDialog } from "@angular/material";
import { MatDialogConfig } from "@angular/material";
import { CradentilsComponent } from "../../common/cradentils/cradentils.component";


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
  selector: "app-bmm-signup-login",
  templateUrl: "./bmm-signup-login.component.html",
  styleUrls: ["./bmm-signup-login.component.css"],
})
export class BmmSignupLoginComponent implements OnInit, AfterViewInit {
  @ViewChild("phoneNumberInput", { static: false })
  phoneNumberInput: ElementRef;
  cradentialID:string="";
  cradentialPassword:string="";
  creatingAccount: boolean = false;
  privacy = false;
  passwordFieldType: string = "password";
  showPasswordIcon: string = "visibility_off";
  states = allState.states.map((item) => item.state);
  cities = [];
  // role: "";
  aadharImage: File | null = null;
  aadharBackImage: File | null = null;
  panImage: File | null = null;
  aadharImageName: string = "";
  backAadharImageName: string = "";
  panImageName: string = "";
  createBmm = {
    refferal_id: "",
  };
  spin = false;
  change = false;
  countryCode: "";
  pagename: String = "Sign in your account";
  bmmSignUpForm: FormGroup;
  bmmLoginForm: FormGroup;
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
    this.bmmSignUpForm = this.formBuilder.group({
      aadharImage: [null, [fileSizeValidator(2048)]], // Set 2 as the maximum allowed size in MB
      aadharBackImage: [null, [fileSizeValidator(2048)]],
      panImage: [null, [fileSizeValidator(2048)]],
      reffered_id: new FormControl({ value: "admin123", disabled: true }, [Validators.required]),
      name: new FormControl("", [Validators.required]),
      lname: new FormControl("", [Validators.required]),
      email: new FormControl("", [ Validators.email]),
      phone: new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
      ]),
      gender: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      user_id: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });

    this.bmmLoginForm = this.formBuilder.group({
      loginUser_id: new FormControl("", [Validators.required]),
      loginPassword: new FormControl("", [Validators.required]),
    });
  }

  onStateChange() {
    console.log();
    const selectedState = this.bmmSignUpForm.get("state").value;
    const selectedStateObj = allState.states.find(
      (state) => state.state === selectedState
    );
    this.cities = selectedStateObj.districts;
  }

  addBmmData(form: FormGroup) {
      if (
    this.bmmSignUpForm.get('aadharImage').hasError('fileSizeExceeded') ||
    this.bmmSignUpForm.get('aadharBackImage').hasError('fileSizeExceeded') ||
    this.bmmSignUpForm.get('panImage').hasError('fileSizeExceeded')
  ) {
    // Prevent form submission if any file size exceeds the limit
    return;
  }
    this.creatingAccount = true;
    this.createBmm.refferal_id =
      this.bmmSignUpForm.value.user_id + Math.floor(Math.random() * 100000);
    console.log(this.createBmm.refferal_id);
    console.log(
      this.bmmSignUpForm.value.reffered_id,
      this.bmmSignUpForm.value.name,
      this.bmmSignUpForm.value.lname,
      this.bmmSignUpForm.value.email,
      this.bmmSignUpForm.value.phone,
      this.bmmSignUpForm.value.gender,
      this.bmmSignUpForm.value.state,
      this.bmmSignUpForm.value.user_id,
      this.bmmSignUpForm.value.password,
      this.aadharBackImage,
      this.aadharImage,
      this.panImage
    );

    const formData = new FormData();
    formData.append("fname", this.bmmSignUpForm.value.name);
    formData.append("lname", this.bmmSignUpForm.value.lname);
    // formData.append('phone','+' + this.countryCode + this.bmmSignUpForm.value.phone.replace(/\s/g, ''));
    formData.append("phone", this.bmmSignUpForm.value.phone.replace(/\s/g, ""));

    formData.append("email", this.bmmSignUpForm.value.email);
    formData.append("gender", this.bmmSignUpForm.value.gender);
    formData.append("selectedState", this.bmmSignUpForm.value.state);
    formData.append("stateHandlerId", this.bmmSignUpForm.value.user_id);
    this.cradentialID = this.bmmSignUpForm.value.user_id;
    formData.append("password", this.bmmSignUpForm.value.password);
    this.cradentialPassword = this.bmmSignUpForm.value.password;
    formData.append("adhar_front_side", this.aadharImage);
    formData.append("adhar_back_side", this.aadharBackImage);
    formData.append("panCard", this.panImage);
    formData.append("referredId", "admin123");

    console.log(formData, "126");

    this.userService.createSho(formData).subscribe({
      next: (response) => {
        if (response) {
          localStorage.setItem("login", "true");
          localStorage.setItem("stateHandlerId", response.data.stateHandlerId);
          localStorage.setItem("stateRefferalId", response.data.referralId);
          localStorage.setItem("userType", "BMM");
          this.shareService.setToken(response.data.token);
          this.toastr.success("SignUP successfully", "Success");
          this.cradentialsModal();
          this.creatingAccount = false;
          this.router.navigate(["statedashboard"]);
          form.reset();
          // this.spin = false;
        }
      },
      error: (error) => {
        // this.spin = false;
        this.creatingAccount = false;
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
        userType: "BMM"
      }
    };
    const dialogRef = this.dialog.open(CradentilsComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
  }

  loginBmm(form: FormGroup) {
    console.log(
      this.bmmLoginForm.value.loginUser_id,
      this.bmmLoginForm.value.loginPassword
    );
    let data = {
      userid: this.bmmLoginForm.value.loginUser_id,
      password: this.bmmLoginForm.value.loginPassword,
    };

    console.log(data);

    this.userService.shoLogin(data).subscribe({
      next: (response: any) => {
        if (response) {
          localStorage.setItem("login", "true");
          localStorage.setItem("stateHandlerId", response.user.stateHandlerId);
          localStorage.setItem("stateRefferalId", response.user.referralId);
          localStorage.setItem("userType", response.user.userType);
          this.shareService.setToken(response.token);
          this.toastr.success("Logged In Successfully", "success");
          this.router.navigate(["statedashboard"]);
          setTimeout(function () {
            window.location.reload();
          }, 100);
        }
      },
      error: (error) => {
        this.toastr.error(error.error.message, "Error");
      },
    });
  }

  ngOnInit() {
    // this.cradentialsModal()
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
      console.error("phoneNumberInput is not initialized or undefined.");
    }
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
        this.bmmSignUpForm.get('aadharImage').setValue(selectedFile);
        console.log("Selected File:", this.aadharImage, fileSelected);
      }
    }
    if (fileSelected === "back") {
      const selectedFile: File = event.target.files[0];
      if (selectedFile) {
        this.aadharBackImage = selectedFile;
        this.bmmSignUpForm.get('aadharBackImage').setValue(selectedFile);
        console.log("Selected File:", this.aadharBackImage, fileSelected);
      }
    }

    if (fileSelected === "pan") {
      const selectedFile: File = event.target.files[0];
      if (selectedFile) {
        this.panImage = selectedFile;
        this.bmmSignUpForm.get('panImage').setValue(selectedFile);
        console.log("Selected File:", this.panImage, fileSelected);
      }
    }
  }

  loginPage() {
    this.change = !this.change;
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

  handleChange(event: any) {
    // Handle the checkbox change here
    if (event.checked) {
      this.privacy = true;
    } else {
      this.privacy = false;
    }
  }

  privacyPolicy() {
    this.router.navigate(["/privacy-policy"]);
  }
}
