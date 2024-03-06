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
  selector: "app-signup-franchise",
  templateUrl: "./signup-franchise.component.html",
  styleUrls: ["./signup-franchise.component.css"],
})
export class SignupFranchiseComponent implements OnInit, AfterViewInit {
  @ViewChild("phoneNumberInput")
  phoneNumberInput: ElementRef;

  creatingAccount: boolean = false;
  cradentialID:string="";
  cradentialPassword:string="";
  passwordFieldType: string = "password";
  showPasswordIcon: string = "visibility_off";
  states = allState.states.map((item) => item.state);
  cities = [];
  aadharImage: File | null = null;
  aadharBackImage: File | null = null;
  panImage: File | null = null;
  aadharImageName: string = "";
  backAadharImageName: string = "";
  panImageName: string = "";
  createFranchise = {
    refferal_id: "",
  };
  spin = false;
  change = false;
  privacy = false;
  countryCode: "";
  role: string = "";
  officialReferral:string="";
  pagename: String = "Sign in your account";
  franchiseSignUpForm: FormGroup;
  franchiseLoginForm: FormGroup;
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
    this.franchiseSignUpForm = this.formBuilder.group({
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
      gender: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      district: new FormControl("", [Validators.required]),
      user_id: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });

    this.franchiseLoginForm = this.formBuilder.group({
      loginUser_id: new FormControl("", [Validators.required]),
      loginPassword: new FormControl("", [Validators.required]),
    });
  }

  onStateChange() {
    const selectedState = this.franchiseSignUpForm.get("state").value;
    const selectedStateObj = allState.states.find(
      (state) => state.state === selectedState
    );
    this.cities = selectedStateObj.districts;
  }

  onRoleChange(event: any): void {
    const updatedValue = event.value;
    console.log("Selected role:", updatedValue);
    this.setRefferedIdValue(updatedValue);
  }

  setRefferedIdValue(selectedRole: string): void {
    const referredIdControl = this.franchiseSignUpForm.get("reffered_id");
    console.log(referredIdControl);

    if (referredIdControl) {
      if (selectedRole === "OFFICIAL") {
        referredIdControl.setValue("BMM-BMM8018");
        referredIdControl.disable();
        this.officialReferral = referredIdControl.value;
      } else {
        referredIdControl.setValue("");
        referredIdControl.enable();
        this.officialReferral = "";
      }
    } else {
      console.error("referred_id control not found in the form group");
    }
  }

  addFranchiseData(form: FormGroup) {
    if (
      this.franchiseSignUpForm.get('aadharImage').hasError('fileSizeExceeded') ||
      this.franchiseSignUpForm.get('aadharBackImage').hasError('fileSizeExceeded') ||
      this.franchiseSignUpForm.get('panImage').hasError('fileSizeExceeded')
    ) {
      // Prevent form submission if any file size exceeds the limit
      return;
    }

    this.creatingAccount = true;
    this.createFranchise.refferal_id =
      this.franchiseSignUpForm.value.user_id +
      Math.floor(Math.random() * 100000);
    const formData = new FormData();
    formData.append("referredId", this.officialReferral? this.officialReferral : this.franchiseSignUpForm.value.reffered_id);
    formData.append("fname", this.franchiseSignUpForm.value.name);
    formData.append("lname", this.franchiseSignUpForm.value.lname);
    // formData.append(
    //   "phone",
    //   "+" +
    //     this.countryCode +
    //     this.franchiseSignUpForm.value.phone.replace(/\s/g, "")
    // );
    formData.append(
      "phone",

      this.franchiseSignUpForm.value.phone.replace(/\s/g, "")
    );
    formData.append("email", this.franchiseSignUpForm.value.email);
    formData.append("gender", this.franchiseSignUpForm.value.gender);
    formData.append("franchiseState", this.franchiseSignUpForm.value.state);
    formData.append("franchiseCity", this.franchiseSignUpForm.value.district);
    formData.append("franchiseId", this.franchiseSignUpForm.value.user_id);
    this.cradentialID = this.franchiseSignUpForm.value.user_id;
    formData.append("password", this.franchiseSignUpForm.value.password);
    this.cradentialPassword = this.franchiseSignUpForm.value.password;
    formData.append("adhar_front_side", this.aadharImage);
    formData.append("adhar_back_side", this.aadharBackImage);
    formData.append("panCard", this.panImage);

    this.userService.createFranchise(formData).subscribe({
      next: (response) => {
        if (response) {
          localStorage.setItem("login", "true");
          localStorage.setItem("franchiseId", response.data.franchiseId);
          localStorage.setItem("franchiseRefferalId", response.data.referralId);
          localStorage.setItem("userType", response.data.userType);
          this.shareService.setFranchiseToken(response.data.token);
          this.toastr.success("Data submitted successfully", "Success");
          this.cradentialsModal();
          this.creatingAccount = false;
          this.router.navigate(["franchisedashboard"]);
          form.reset();
        }
      },
      error: (error) => {
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
        userType: "FRANCHISE"
      }
    };
    const dialogRef = this.dialog.open(CradentilsComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
  }

  loginFranchise(form: FormGroup) {
    let data = {
      userid: this.franchiseLoginForm.value.loginUser_id,
      password: this.franchiseLoginForm.value.loginPassword,
    };

    this.userService.franchiseLogin(data).subscribe({
      next: (response: any) => {
        if (response) {
          localStorage.setItem("login", "true");
          localStorage.setItem("franchiseId", response.user.franchiseId);
          localStorage.setItem("franchiseRefferalId", response.user.referralId);
          localStorage.setItem("userType", response.user.userType);
          this.shareService.setFranchiseToken(response.token);
          this.toastr.success("Logged In Successfully", "success");
          this.router.navigate(["franchisedashboard"]);
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
        this.franchiseSignUpForm.get('aadharImage').setValue(selectedFile);
        console.log("Selected File:", this.aadharImage, fileSelected);
      }
    }
    if (fileSelected === "back") {
      const selectedFile: File = event.target.files[0];
      if (selectedFile) {
        this.aadharBackImage = selectedFile;
        this.franchiseSignUpForm.get('aadharBackImage').setValue(selectedFile);
        console.log("Selected File:", this.aadharBackImage, fileSelected);
      }
    }

    if (fileSelected === "pan") {
      const selectedFile: File = event.target.files[0];
      if (selectedFile) {
        this.panImage = selectedFile;
        this.franchiseSignUpForm.get('panImage').setValue(selectedFile);
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
