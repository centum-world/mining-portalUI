import { AfterViewInit, Component, ElementRef,  OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormGroupDirective,
  NgForm,
 } from '@angular/forms';
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-rig-id',
  templateUrl: './rig-id.component.html',
  styleUrls: ['./rig-id.component.css']
})
export class RigIdComponent implements OnInit, AfterViewInit {
  @ViewChild("phoneNumberInputForNew", { static: false }) phoneNumberInputForNew: ElementRef | undefined;
  toggleValue: boolean = false;
  countryCode: string = 'IN';
  aadharImage: File | null = null;
  aadharBackImage: File | null = null;
  panImage: File|null = null;
  aadharImageName: string = "";
  backAadharImageName: string = "";
  panImageName: string = "";
  newAccountForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.newAccountForm = this.formBuilder.group({
      fname: new FormControl("", [Validators.required]),
      lname: new FormControl("", [Validators.required]),
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
      dob: new FormControl("", [Validators.required]),
      liquidity: new FormControl("", [Validators.required]),
      
    });

    
    
   }

  ngOnInit() {
  }


  onToggleChange(event: Event) {
    this.toggleValue = !this.toggleValue;
    console.log('Toggle changed', this.toggleValue);
    if(!this.toggleValue){
      setTimeout(() => {
        this.initializeIntlTelInput();
      }, 100);
    }
  }

  ngAfterViewInit() {
    this.initializeIntlTelInput();
  }

  initializeIntlTelInput(){
    this.countryCode ='IN';
    const inputElement = this.phoneNumberInputForNew.nativeElement;
    const iti = intlTelInput(inputElement, {
      separateDialCode: true,
      nationalMode: false,
    });
    console.log("IntlTelInput instance:", iti);
    iti.setCountry(this.countryCode);

    inputElement.addEventListener('countrychange', () => {
      this.updateCountryCode(iti);
    });
  }

  private updateCountryCode(iti: any) {
    const selectedCountryData = iti.getSelectedCountryData();
    console.log('Updated Country Code:', selectedCountryData.dialCode);
    this.countryCode = selectedCountryData.dialCode;
  }

  addnewAccount( form : FormGroup ){
    console.log(this.newAccountForm, this.aadharImage, this.aadharBackImage, this.panImage)
    const originalDateStrDop = this.newAccountForm.value.dob;
    const dateObj1 = new Date(originalDateStrDop);
    const yearDop = dateObj1.getFullYear();
    const monthDop = String(dateObj1.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const dayDop = String(dateObj1.getDate()).padStart(2, "0");
    const newDobFormat = `${yearDop}-${monthDop}-${dayDop}`;

    const formData = new FormData();
    formData.append('fname', this.newAccountForm.value.fname);
    formData.append('lname', this.newAccountForm.value.lname);
    formData.append('adharNumber', this.newAccountForm.value.aadhar);
    // formData.append('p_phone','+' + this.countryCode + this.partnerSignUpForm.value.phone.replace(/\s/g, ''));
    formData.append('phone','+' + this.countryCode +  this.newAccountForm.value.phone.replace(/\s/g, ''));
    formData.append('dob',newDobFormat);
    formData.append('liquidity',this.newAccountForm.value.liquidity);
    formData.append('adhar_front_side', this.aadharImage);
    formData.append('adhar_back_side', this.aadharBackImage);
    formData.append('panCard',this.panImage);
    formData.append('userId', localStorage.getItem('partnerdetails'));

    this.userService.newRigPartnerAccount(formData).subscribe({
      next: response => {
        if (response) {
            form.reset();
        }
      },
      error: error => {
        
      }
    })

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

}
