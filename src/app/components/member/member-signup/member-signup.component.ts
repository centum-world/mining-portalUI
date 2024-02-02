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
  selector: 'app-member-signup',
  templateUrl: './member-signup.component.html',
  styleUrls: ['./member-signup.component.css']
})
export class MemberSignupComponent implements OnInit, AfterViewInit {
  @ViewChild("phoneNumberInput", { static: true }) phoneNumberInput: ElementRef;

  passwordFieldType: string = "password";
  showPasswordIcon: string = "visibility";
  // role: "";
  aadharImage: File | null = null;
  aadharBackImage: File | null = null;
  panImage: File|null = null;
  aadharImageName: string = "";
  backAadharImageName: string = "";
  panImageName: string = "";
  createReferralMember = {
    refferal_id: "",
  };
  spin = false;
  change = false;
  countryCode:"";
  memberSignUpFrom: FormGroup;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.memberSignUpFrom = this.formBuilder.group({
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
      qualification: new FormControl("", [Validators.required]),
      designation: new FormControl("", [Validators.required]),
      experience: new FormControl("", [Validators.required]),
      salary:new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      dob: new FormControl("", [Validators.required]),
      doj: new FormControl("", [Validators.required]),
      user_id: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  addMemberData(form: FormGroup) {
    this.spin = true;
    this.createReferralMember.refferal_id = this.memberSignUpFrom.value.user_id + Math.floor(Math.random() * 100000);
    console.log(this.createReferralMember.refferal_id)
    console.log(
      this.memberSignUpFrom.value.reffered_id,
      this.memberSignUpFrom.value.name,
      this.memberSignUpFrom.value.lname,
      this.memberSignUpFrom.value.email,
      this.memberSignUpFrom.value.phone,
      this.memberSignUpFrom.value.gender,
      this.memberSignUpFrom.value.qualification,
      this.memberSignUpFrom.value.designation,
      this.memberSignUpFrom.value.experience,
      this.memberSignUpFrom.value.salary,
      this.memberSignUpFrom.value.address,
      this.memberSignUpFrom.value.state,
      this.memberSignUpFrom.value.dob,
      this.memberSignUpFrom.value.doj,
      this.memberSignUpFrom.value.user_id,
      this.memberSignUpFrom.value.password,
      this.aadharBackImage,
      this.aadharImage,
      this.panImage
    );

    const formData = new FormData();
    formData.append('m_refferid', this.memberSignUpFrom.value.reffered_id);
    formData.append('m_name', this.memberSignUpFrom.value.name);
    formData.append('m_lname', this.memberSignUpFrom.value.lname);
    formData.append('m_phone','+' + '91' + this.memberSignUpFrom.value.phone);
    formData.append('m_email',  this.memberSignUpFrom.value.email);
    formData.append('m_gender',this.memberSignUpFrom.value.gender);
    formData.append('m_quali',this.memberSignUpFrom.value.qualification);
    formData.append('m_designation',this.memberSignUpFrom.value.designation);
    formData.append('m_exp',this.memberSignUpFrom.value.experience);
    formData.append('m_salary',this.memberSignUpFrom.value.salary);
    formData.append('m_add', this.memberSignUpFrom.value.address);
    formData.append('m_state',this.memberSignUpFrom.value.state);
    formData.append('m_dob',this.memberSignUpFrom.value.dob);
    formData.append('m_doj',this.memberSignUpFrom.value.doj);
    formData.append('m_userid', this.memberSignUpFrom.value.user_id);
    formData.append('m_password', this.memberSignUpFrom.value.password);
    formData.append('reffer_id', this.createReferralMember.refferal_id)
    formData.append('adhar_front_side', this.aadharImage);
    formData.append('adhar_back_side', this.aadharBackImage);
    formData.append('panCard',this.panImage);

    console.log(formData,'126')
  
    this.userService.signUpMember(formData).subscribe({
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

  ngOnInit() {
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
