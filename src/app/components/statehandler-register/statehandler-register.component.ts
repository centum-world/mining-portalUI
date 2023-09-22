import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { allState } from '../common/states';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm, ValidatorFn, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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

  allStates = allState.states;
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor() { }



  ngOnInit() {
    console.log(allState.states)
  }




  // stateSignUpForm = new FormGroup({
  //   fname: new FormControl("", [Validators.required]),
  //   lname: new FormControl("", [Validators.required]),
  //   phone: new FormControl("", [Validators.required]),
  //   emailFormControl: new FormControl("", [Validators.required,Validators.email]),
  //   state: new FormControl([], [Validators.required]),
  //   gender: new FormControl("", [Validators.required]),
  //   aadhar: new FormControl(File, [Validators.required]),
  //   pan: new FormControl(File, [Validators.required]),
  //   stateid:new FormControl("", [Validators.required]),
  //   password:new FormControl("", [Validators.required]),
  // })



  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required,]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  mobileFormControl = new FormControl('', [Validators.required, mobileNumberValidator()]);
  genderFormControl = new FormControl('', [Validators.required]);
  stateFormControl = new FormControl([], [Validators.required]);
  profileImageControl = new FormControl(null, [
    Validators.required,
    this.fileTypeValidator(['jpg', 'png']) // Custom file type validator
  ]);


  matcher = new MyErrorStateMatcher();

  fileTypeInvalid = false;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input && input.files;
  
    if (files && files.length > 0) {
      const file = files[0];
      const fileType = file.type.split('/')[1].toLowerCase();
  
      if (!this.isValidFileType(fileType)) {
        this.fileTypeInvalid = true;
        this.profileImageControl.setErrors({ fileTypeInvalid: true });
      } else {
        this.fileTypeInvalid = false;
        this.profileImageControl.setValue(file);
      }
    }
  }
  
  

  private isValidFileType(fileType: string): boolean {
    return ['jpg', 'jpeg', 'png'].includes(fileType);
  }

  private fileTypeValidator(allowedTypes: string[]) {
    return (control: FormControl): { [key: string]: any } | null => {
      const file = control.value;
      if (file) {
        const fileType = file.type.split('/')[1].toLowerCase();
        if (!allowedTypes.includes(fileType)) {
          return { fileTypeInvalid: true };
        }
      }
      return null;
    };
  }



}
