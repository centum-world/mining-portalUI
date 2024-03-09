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
import { ShareService } from "src/app/shareService/share.service";
import { ErrorStateMatcher } from "@angular/material/core";
import { allState } from "../../common/states";
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
  selector: "app-member-signup",
  templateUrl: "./member-signup.component.html",
  styleUrls: ["./member-signup.component.css"],
})
export class MemberSignupComponent implements OnInit, AfterViewInit {
  @ViewChild("phoneNumberInput", { static: false })
  phoneNumberInput: ElementRef;
  cradentialID:string="";
  cradentialPassword:string="";

  passwordFieldType: string = "password";
  showPasswordIcon: string = "visibility_off";
  passwordShow: boolean = false;
  states = allState.states.map((item) => item.state);
  aadharImage: File | null = null;
  aadharBackImage: File | null = null;
  panImage: File | null = null;
  aadharImageName: string = "";
  backAadharImageName: string = "";
  panImageName: string = "";
  privacy = false;
  createReferralMember = {
    refferal_id: "",
  };
  spin = false;
  change = false;
  pagename: String = "Sign in your account";
  countryCode: "";
  franchiseReferral:string="";
  memberSignUpFrom: FormGroup;
  memberLoginForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  role:string="";
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private shareService: ShareService,
    private dialog: MatDialog
  ) {
    this.memberSignUpFrom = this.formBuilder.group({
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
      qualification: new FormControl("", [Validators.required]),
      designation: new FormControl("", [Validators.required]),
      experience: new FormControl("", [Validators.required]),
      salary: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      dob: new FormControl("", [Validators.required]),
      doj: new FormControl("", [Validators.required]),
      user_id: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
    this.memberLoginForm = this.formBuilder.group({
      loginUser_id: new FormControl("", [Validators.required]),
      loginPassword: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {
    
  }

  onStateChange() {
    console.log();
    const selectedState = this.memberSignUpFrom.get("state").value;
    const selectedStateObj = allState.states.find(
      (state) => state.state === selectedState
    );
  }

  onRoleChange(event: any): void {
    const updatedValue = event.value;
    this.setRefferedIdValue(updatedValue);
  }

  setRefferedIdValue(selectedRole: string): void {
    const referredIdControl = this.memberSignUpFrom.get("reffered_id");
    console.log(referredIdControl);

    if (referredIdControl) {
      if (selectedRole === "OFFICIAL") {
        referredIdControl.setValue("FC-FRA3588");
        referredIdControl.disable();
        this.franchiseReferral = referredIdControl.value;
      } else {
        referredIdControl.setValue("");
        referredIdControl.enable();
        this.franchiseReferral = "";
      }
    } else {
      console.error("referred_id control not found in the form group");
    }
  }

  addMemberData(form: FormGroup) {
    if (
      this.memberSignUpFrom.get('aadharImage').hasError('fileSizeExceeded') ||
      this.memberSignUpFrom.get('aadharBackImage').hasError('fileSizeExceeded') ||
      this.memberSignUpFrom.get('panImage').hasError('fileSizeExceeded')
    ) {
      // Prevent form submission if any file size exceeds the limit
      return;
    }
    this.spin = true;
    this.createReferralMember.refferal_id =
      this.memberSignUpFrom.value.user_id + Math.floor(Math.random() * 100000);

    const originalDateStrDob = this.memberSignUpFrom.value.dob;
    const dateObj = new Date(originalDateStrDob);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(dateObj.getDate()).padStart(2, "0");
    const newDobFormat = `${year}-${month}-${day}`;

    // ------------------------DoJ---------

    const originalDateStrDoj = this.memberSignUpFrom.value.doj;
    const dateObj1 = new Date(originalDateStrDoj);
    const yearDoj = dateObj1.getFullYear();
    const monthDoj = String(dateObj1.getMonth() + 1).padStart(2, "0");
    const dayDoj = String(dateObj1.getDate()).padStart(2, "0");
    const newDojFormat = `${yearDoj}-${monthDoj}-${dayDoj}`;

    const formData = new FormData();
    formData.append("m_refferid", this.franchiseReferral? this.franchiseReferral : this.memberSignUpFrom.value.reffered_id);
    formData.append("m_name", this.memberSignUpFrom.value.name);
    formData.append("m_lname", this.memberSignUpFrom.value.lname);
    // formData.append(
    //   "m_phone",
    //   "+" +
    //     this.countryCode +
    //     this.memberSignUpFrom.value.phone.replace(/\s/g, "")
    // );
    formData.append("m_phone",this.memberSignUpFrom.value.phone.replace(/\s/g, ""));
    formData.append("m_email", this.memberSignUpFrom.value.email);
    formData.append("m_gender", this.memberSignUpFrom.value.gender);
    formData.append("m_quali", this.memberSignUpFrom.value.qualification);
    formData.append("m_designation", this.memberSignUpFrom.value.designation);
    formData.append("m_exp", this.memberSignUpFrom.value.experience);
    formData.append("m_salary", this.memberSignUpFrom.value.salary);
    formData.append("m_add", this.memberSignUpFrom.value.address);
    formData.append("m_state", this.memberSignUpFrom.value.state);
    formData.append("m_dob", newDobFormat);
    formData.append("m_doj", newDojFormat);
    formData.append("m_userid", this.memberSignUpFrom.value.user_id);
    this.cradentialID = this.memberSignUpFrom.value.user_id;
    formData.append("m_password", this.memberSignUpFrom.value.password);
    this.cradentialPassword = this.memberSignUpFrom.value.password;
    formData.append("reffer_id", this.createReferralMember.refferal_id);
    formData.append("adhar_front_side", this.aadharImage);
    formData.append("adhar_back_side", this.aadharBackImage);
    formData.append("panCard", this.panImage);

    this.userService.signUpMember(formData).subscribe({
      next: (response) => {
        if (response) {
          localStorage.setItem("login", "true");
          this.shareService.setUserId(response.data.m_userid);
          this.shareService.setRefferID(response.data.reffer_id);
          localStorage.setItem("userType", response.data.userType);
          this.shareService.setToken(response.token);
          this.toastr.success("Data submitted successfully", "Success");
          this.cradentialsModal()
          this.spin = false;
          this.router.navigate(["memberdashboard"]);
          form.reset();
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
        userType: "REFERRAL"
      }
    };
    const dialogRef = this.dialog.open(CradentilsComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
  }

  loginMember(form: FormGroup) {
    console.log(
      this.memberLoginForm.value.loginUser_id,
      this.memberLoginForm.value.loginPassword
    );
    let data = {
      m_userid: this.memberLoginForm.value.loginUser_id,
      m_password: this.memberLoginForm.value.loginPassword,
    };

    this.userService.memberLogin(data).subscribe({
      next: (response: any) => {
        if (response) {
          localStorage.setItem("login", "true");
          this.shareService.setToken(response.token);
          this.shareService.setUserId(response.data[0].m_userid);
          this.shareService.setRefferID(response.data[0].reffer_id);
          localStorage.setItem("userType", response.data[0].userType);
          this.toastr.success("Logged In Successfully", "success");
          this.router.navigate(["memberdashboard"]);
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

  

  ngAfterViewInit() {
    if (this.phoneNumberInput && this.phoneNumberInput.nativeElement) {
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
    } else {
      console.error("phoneNumberInput is not initialized or undefined.");
    }
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === "password" ? "text" : "password";
    this.passwordShow = !this.passwordShow;
    this.showPasswordIcon = this.passwordShow ? "visibility" : "visibility_off";
  }

  onFileSelected(event: any, fileSelected: any): void {
    if (fileSelected === "front") {
      const selectedFile: File = event.target.files[0];
      if (selectedFile) {
        this.aadharImage = selectedFile;
        this.memberSignUpFrom.get('aadharImage').setValue(selectedFile);
        console.log("Selected File:", this.aadharImage, fileSelected);
      }
    }
    if (fileSelected === "back") {
      const selectedFile: File = event.target.files[0];
      if (selectedFile) {
        this.aadharBackImage = selectedFile;
        this.memberSignUpFrom.get('aadharBackImage').setValue(selectedFile);
        console.log("Selected File:", this.aadharBackImage, fileSelected);
      }
    }

    if (fileSelected === "pan") {
      const selectedFile: File = event.target.files[0];
      if (selectedFile) {
        this.panImage = selectedFile;
        this.memberSignUpFrom.get('panImage').setValue(selectedFile);
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
