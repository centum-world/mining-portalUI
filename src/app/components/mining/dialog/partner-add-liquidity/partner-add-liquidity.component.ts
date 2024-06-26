import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  SimpleChanges,
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormGroupDirective,
  NgForm,
} from "@angular/forms";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import { UserService } from "src/app/service/user.service";
import { ToastrService } from "ngx-toastr";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-partner-add-liquidity',
  templateUrl: './partner-add-liquidity.component.html',
  styleUrls: ['./partner-add-liquidity.component.css']
})
export class PartnerAddLiquidityComponent implements OnInit ,AfterViewInit {
  @ViewChild("phoneNumberInputForNew", { static: false })
  
  phoneNumberInputForNew: ElementRef | undefined;
  toggleValue: boolean = false;
  countryCode: string = "IN";
  aadharImage: File | null = null;
  aadharBackImage: File | null = null;
  panImage: File | null = null;
  aadharImageName: string = "";
  backAadharImageName: string = "";
  panImageName: string = "";
  isSubmitting: boolean = false;
  newAccountForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<PartnerAddLiquidityComponent>
  ) {
    this.newAccountForm = this.formBuilder.group({
      fname: new FormControl("",[Validators.required]),
      lname: new FormControl("",[Validators.required]),
      phone: new FormControl("", [
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
      ]),
      aadhar: new FormControl("", [
        Validators.maxLength(12),
        Validators.minLength(12),
      ]),
      dob: new FormControl(""),
      dop: new FormControl("", [Validators.required]),
      liquidity: new FormControl("", [Validators.required]),
    });
  }


  ngOnInit() {
  }

  onToggleChange(event: Event) {
    this.toggleValue = !this.toggleValue;
    console.log("Toggle changed", this.toggleValue);
    if (!this.toggleValue) {
      setTimeout(() => {
        this.initializeIntlTelInput();
      }, 100);
    }
  }

  ngAfterViewInit() {
    this.initializeIntlTelInput();
  }

  initializeIntlTelInput() {
    const inputElement = this.phoneNumberInputForNew.nativeElement;
    const iti = intlTelInput(inputElement, {
      separateDialCode: true,
      nationalMode: false,
    });
    console.log("IntlTelInput instance:", iti);
    iti.setCountry("in");

    const selectedCountryData = iti.getSelectedCountryData();
    console.log("Updated Country Code:", selectedCountryData.dialCode);
    this.countryCode = selectedCountryData.dialCode;

    inputElement.addEventListener("countrychange", () => {
      this.updateCountryCode(iti);
    });
  }

  private updateCountryCode(iti: any) {
    const selectedCountryData = iti.getSelectedCountryData();
    console.log("Updated Country Code:", selectedCountryData.dialCode);
    this.countryCode = selectedCountryData.dialCode;
  }

  addnewAccount(form: FormGroup) {

    console.log('hiiiiiiiiii')
    // if (form.valid) {

    this.isSubmitting = true;
    
    // date of birth
    const originalDateStrDob = this.newAccountForm.value.dob;
    const dateObj1 = new Date(originalDateStrDob);
    const yearDob = dateObj1.getFullYear();
    const monthDob = String(dateObj1.getMonth() + 1).padStart(2, "0");
    const dayDob = String(dateObj1.getDate()).padStart(2, "0");
    const newDobFormat = `${yearDob}-${monthDob}-${dayDob}`;

    // date of joining
    const originalDateStrDop = this.newAccountForm.value.dop;
    const dateObj2 = new Date(originalDateStrDop);
    const yearDop = dateObj2.getFullYear();
    const monthDop = String(dateObj2.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const dayDop = String(dateObj2.getDate()).padStart(2, "0");
    const newDopFormat = `${yearDop}-${monthDop}-${dayDop}`;

    const formData = new FormData();
    formData.append("fname", this.newAccountForm.value.fname);
    formData.append("lname", this.newAccountForm.value.lname);
    formData.append("adharNumber", this.newAccountForm.value.aadhar);
    // formData.append('p_phone','+' + this.countryCode + this.partnerSignUpForm.value.phone.replace(/\s/g, ''));
    formData.append(
      "phone",
      "+" +
        this.countryCode +
        this.newAccountForm.value.phone.replace(/\s/g, "")
    );
    formData.append("dob", newDobFormat);
    formData.append("dop", newDopFormat);
    formData.append("liquidity", this.newAccountForm.value.liquidity);
    formData.append("adhar_front_side", this.aadharImage);
    formData.append("adhar_back_side", this.aadharBackImage);
    formData.append("panCard", this.panImage);
    formData.append("userId", localStorage.getItem("partnerdetails"));
    if(this.toggleValue ){
      formData.append("same","same");
    }
    else{
      formData.append("same",'hiii');
    }

    this.userService.newRigPartnerAccount(formData).subscribe({
      next: (response: any) => {
        if (response) {
         this.isSubmitting = false;
          form.reset();
          this.toastr.success(response.message);
          this.dialogRef.close();
         
        }
      },
      error: (error: any) => {
       this.isSubmitting = false;
        this.toastr.error(error.error.message);
      },
    });
  // } else {
    // Show a message or handle invalid form
  //   this.toastr.error('Please fill in all required fields correctly.');
  // }
}

  onFileSelected(event: any, fileSelected: any): void {
    if (fileSelected === "front") {
      const selectedFile: File = event.target.files[0];
      if (selectedFile) {
        this.aadharImage = selectedFile;
        console.log("Selected File:", this.aadharImage, fileSelected);
      }
    }
    if (fileSelected === "back") {
      const selectedFile: File = event.target.files[0];
      if (selectedFile) {
        this.aadharBackImage = selectedFile;
        console.log("Selected File:", this.aadharBackImage, fileSelected);
      }
    }

    if (fileSelected === "pan") {
      const selectedFile: File = event.target.files[0];
      if (selectedFile) {
        this.panImage = selectedFile;
        console.log("Selected File:", this.panImage, fileSelected);
      }
    }
  }

}
