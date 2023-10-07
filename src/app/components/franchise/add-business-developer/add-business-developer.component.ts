import { Component, OnInit } from '@angular/core';
import { allState } from '../../common/states';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm, ValidatorFn, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/service/user.service';
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
  selector: 'app-add-business-developer',
  templateUrl: './add-business-developer.component.html',
  styleUrls: ['./add-business-developer.component.css']
})
export class AddBusinessDeveloperComponent implements OnInit {
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


  matcher = new MyErrorStateMatcher();
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
      backAadhar: this.backAadharImageControl,
      pan: this.panControl,
      bdHandlerId: this.bdIdFormControl,
      password: this.passwordFormControl
    });
  }

  onFileSelected(event: any, fileType: string) {
    const file = event.target.files[0];
    if (fileType === 'frontAadharImage') {
      this.frontAadharImageControl.setValue(file);
      this.fileTypeInvalid = !file.type.match('image/jpeg') && !file.type.match('image/png');
    }else if(fileType === 'backtAadharImage'){
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
    console.log(city.districts)
    this.cities = city.districts;
  }

  ngOnInit() {
  }


  addBusiness(form: FormGroup){
    console.log(form.value.pan, form.value.frontAadhar, form.value.backAadhar)
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
    formData.append('adhar_back_side', form.value.backAadhar);
    
  
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
}
