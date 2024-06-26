import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { allState } from '../../common/states';
import { ToastrService } from 'ngx-toastr';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

function mobileNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = /^\d{10}$/.test(control.value);
    return isValid ? null : { 'invalidMobileNumber': { value: control.value } };
  };
}

@Component({
  selector: 'app-bd-signup-page',
  templateUrl: './bd-signup-page.component.html',
  styleUrls: ['./bd-signup-page.component.css']
})
export class BdSignupPageComponent implements OnInit {
  allStates = allState.states;
  cities:string[];
  hide = true;

  bdSignUpForm: FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required,]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  mobileFormControl = new FormControl('', [Validators.required, mobileNumberValidator()]);
  genderFormControl = new FormControl('', [Validators.required]);
  bdFormControl = new FormControl('', [Validators.required]);
  bdCityFormControl = new FormControl('', [Validators.required]);
  frontAadharImageControl = new FormControl(null, [
    Validators.required,
  ]);
  backAadharImageControl = new FormControl(null, [
    Validators.required,
  ]);
  panControl = new FormControl(null, [
    Validators.required,
  ]);
  fileTypeInvalid = false;
  fileTypeInvalidPanCard = false;
  fileTypeInvalidBackAadhar = false
  referralFormControl = new FormControl('', [Validators.required]);
  bdIdFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  onFileSelected(event: any, fileType: string) {
    const file = event.target.files[0];
    if (fileType === 'frontAadhar') {
      this.frontAadharImageControl.setValue(file);
      this.fileTypeInvalid = !file.type.match('image/jpeg') && !file.type.match('image/png');
    }else if(fileType === 'aadharBackImage'){
      this.backAadharImageControl.setValue(file);
      this.fileTypeInvalidBackAadhar = !file.type.match('image/jpeg') && !file.type.match('image/png');
    }else if (fileType === 'panCard') {
      this.panControl.setValue(file);
      this.fileTypeInvalidPanCard = !file.type.match('image/jpeg') && !file.type.match('image/png');
    }
  }

  onStateChange(selectedState: string) {
    console.log('Selected state:', selectedState);
    const city = allState.states.find((state)=> state.state === selectedState)
    console.log("============>",city)
    this.cities = city.districts;
  }

  constructor(private fb: FormBuilder, private userService: UserService, private toastr: ToastrService) {
    this.bdSignUpForm = this.fb.group({
      referredId: this.referralFormControl,
      fname: this.nameFormControl,
      lname: this.lastNameFormControl,
      email: this.emailFormControl,
      phone: this.mobileFormControl,
      gender: this.genderFormControl,
      state: this.bdFormControl,
      city: this.bdCityFormControl,
      frontAadhar: this.frontAadharImageControl,
      aadharBackImage: this.backAadharImageControl,
      pan: this.panControl,
      bdHandlerId: this.bdIdFormControl,
      password: this.passwordFormControl
    });
  }

  ngOnInit() {
  }

  addBusiness(form: FormGroup){
    console.log("Pan Card Images=>", form.value.pan, form.value.frontAadhar, form.value.aadharBackImage)
    console.log("F Aadhar Card Images=>", form.value.frontAadhar)
    console.log("B Aadhar Card Images=>", form.value.aadharBackImage)
    const formData = new FormData();
    formData.append('fname', form.value.fname);
    formData.append('lname', form.value.lname);
    formData.append('phone', form.value.phone);
    formData.append('email', form.value.email);
    formData.append('gender', form.value.gender);
    formData.append('businessDeveloperId', form.value.bdHandlerId);
    formData.append('referredId', form.value.referredId);
    formData.append('panCard', form.value.pan);
    formData.append('businessCity', form.value.city);
    formData.append('state', form.value.state);
    formData.append('password', form.value.password);
    formData.append('adhar_front_side', form.value.frontAadhar);
    formData.append('adhar_back_side', form.value.aadharBackImage);
    
  
    this.userService.createrBusinessDeveloper(formData).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.toastr.success(res.message)
      },
      error:(err=>{
        this.toastr.warning(err.error.message)
        console.log(err.error.message)
      })
    })
   
  }
  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
  resetForm(){
    this.bdSignUpForm.reset();
  }

  gotoHome(){
    
  }
}
