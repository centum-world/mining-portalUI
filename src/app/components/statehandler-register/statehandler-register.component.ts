import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { allState } from '../common/states';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm, ValidatorFn, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'

/** Error when invalid control is dirty, touched, or submitted. */
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
  selector: 'app-statehandler-register',
  templateUrl: './statehandler-register.component.html',
  styleUrls: ['./statehandler-register.component.css'],
  encapsulation: ViewEncapsulation.None,
})


export class StatehandlerRegisterComponent implements OnInit {
  spin = false;
  allStates = allState.states;

  ngOnInit() {
    console.log(allState.states)
  }

  stateSignUpForm: FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required,]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  mobileFormControl = new FormControl('', [Validators.required, mobileNumberValidator()]);
  genderFormControl = new FormControl('', [Validators.required]);
  stateFormControl = new FormControl([], [Validators.required]);
  aadharFrontImageControl = new FormControl(null, [
    Validators.required,// Custom file type validator
  ]);
  aadharBackImageControl = new FormControl(null, [
    Validators.required,// Custom file type validator
  ]);
  panControl = new FormControl(null, [
    Validators.required,// Custom file type validator
  ]);
  fileTypeInvalid = false;
  fileTypeInvalidPanCard = false;
  stateIdFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);


  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder, private router : Router, private userService: UserService, private toastr: ToastrService) {
    this.stateSignUpForm = this.fb.group({
      fname: this.nameFormControl,
      lname: this.lastNameFormControl,
      email: this.emailFormControl,
      phone: this.mobileFormControl,
      gender: this.genderFormControl,
      state: this.stateFormControl,
      adhar_front_side: this.aadharFrontImageControl,
      adhar_back_side: this.aadharBackImageControl,
      pan: this.panControl,
      stateHandlerId: this.stateIdFormControl,
      password: this.passwordFormControl
    });
  }

  onFileSelected(event: any, fileType: string) {
    const file = event.target.files[0];
    if (fileType === 'aadharFrontImage') {
      this.aadharFrontImageControl.setValue(file);
      this.fileTypeInvalid = !file.type.match('image/jpeg') && !file.type.match('image/png');
    } else if (fileType === 'panCard') {
      this.panControl.setValue(file);
      this.fileTypeInvalidPanCard = !file.type.match('image/jpeg') && !file.type.match('image/png');
    }else if(fileType === "aadharBackImage"){
      this.aadharBackImageControl.setValue(file);
      this.fileTypeInvalid = !file.type.match('image/jpeg') && !file.type.match('image/png');
    }
  }


  addPartnerData(form: FormGroup) {
    this.spin = true;
    console.log('Form submitted:', form.value.fname, form.value.pan, "aadhar Image ==> ", form.value.adhar_back_side);
    const formData = new FormData();
    formData.append('fname', form.value.fname);
    formData.append('lname', form.value.lname);
    formData.append('phone', form.value.phone);
    formData.append('email', form.value.email);
    formData.append('gender', form.value.gender);
    formData.append('selectedState', form.value.state);
    formData.append('adhar_front_side', form.value.adhar_front_side);
    formData.append('adhar_back_side', form.value.adhar_back_side);
    formData.append('panCard', form.value.pan,);
    formData.append('stateHandlerId', form.value.stateHandlerId);
    formData.append('password', form.value.password);
    formData.append('referredId',"admin123");

    this.userService.createSho(formData).subscribe({
      next: (response) => {
        if (response) {
          this.spin = false;
          form.reset();
          this.toastr.success(response.message);
          this.router.navigate(['/statelogin'])
        }
      },
      error: error => {
        this.spin = false;
        console.log(error)
        this.toastr.error(error.error.message);
      }
    })
    
  }

  backToHome(){
    window.location.href = 'https://centumworldrig.com';
  }


}
