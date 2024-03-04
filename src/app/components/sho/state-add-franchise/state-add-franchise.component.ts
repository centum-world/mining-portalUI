import { Component, OnInit } from '@angular/core';
import { allState } from '../../common/states';
import { AsyncValidatorFn, ValidationErrors, AsyncValidator, FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm, ValidatorFn, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, timer } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

const emailAsyncValidator: AsyncValidatorFn = (control: AbstractControl):
  Observable<ValidationErrors | null> => {
  if (!control.valueChanges || control.pristine) {
    return of(null);
  }

  return timer(300).pipe(
    switchMap(() => {
      const email = control.value;
      // Simulated asynchronous email validation (replace with actual HTTP request)
      const isEmailTaken = email === 'taken@example.com';
      return isEmailTaken ? of({ emailTaken: true }) : of(null);
    }),
    catchError(() => of(null)) // Handle errors gracefully
  );
};

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
  selector: 'app-state-add-franchise',
  templateUrl: './state-add-franchise.component.html',
  styleUrls: ['./state-add-franchise.component.css']
})
export class StateAddFranchiseComponent implements OnInit {
  states = allState.states.map((item) => item.state);
  cities = [];
  fileTypeInvalid = false;
  aadharFrontImageSizeExceeds = false;
  aadharBackImageSizeExceeds = false;
  panImageSizeExceeds = false;

  form: FormGroup;

  aadharFrontImageControl = new FormControl(null, [
    Validators.required,
  ]);

  aadharBackImageControl = new FormControl(null, [
    Validators.required,
  ]);

  panImageControl = new FormControl(null, [
    Validators.required,
  ]);

  passwordControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  franchiseIdControl = new FormControl("", Validators.required)
  genderFormControl = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder, private userService: UserService, private toastr: ToastrService, private router: Router) {
    this.form = this.fb.group({
      referalId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', {
        validators: [ Validators.email],
        asyncValidators: [emailAsyncValidator],
        updateOn: 'blur'
      }],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      aadhar: this.aadharFrontImageControl,
      backAadhar: this.aadharBackImageControl,
      pan: this.panImageControl,
      gender: this.genderFormControl,
      franchiseId: this.franchiseIdControl,
      password: this.passwordControl
    });
  }

  matcher = new MyErrorStateMatcher();

  ngOnInit() {}

  onStateChange() {
    const selectedState = this.form.get('state').value;
    const selectedStateObj = allState.states.find(state => state.state === selectedState);
    this.cities = selectedStateObj.districts;
  }

  onFileSelected(event: any, fileType: string) {
    const file = event.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (fileType === 'frontAadharImage') {
      this.aadharFrontImageControl.setValue(file);
      this.aadharFrontImageSizeExceeds = file.size > maxSize;
    } else if (fileType === 'backAadharImage') {
      this.aadharBackImageControl.setValue(file);
      this.aadharBackImageSizeExceeds = file.size > maxSize;
    } else if (fileType === 'panImage') {
      this.panImageControl.setValue(file);
      this.panImageSizeExceeds = file.size > maxSize;
    }
  }

  submitForm() {
    if (this.aadharFrontImageSizeExceeds || this.aadharBackImageSizeExceeds || this.panImageSizeExceeds) {
      // Do not proceed with form submission, show error messages, or take any other necessary action.
      return;
    }

    const formData = new FormData();
    formData.append('fname', this.form.value.firstName);
    formData.append('lname', this.form.value.lastName);
    formData.append('email', this.form.value.email);
    formData.append('gender', this.form.value.gender);
    formData.append('phone', this.form.value.mobileNumber);
    formData.append('referredId', this.form.value.referalId);
    formData.append('franchiseState', this.form.value.state);
    formData.append('franchiseCity', this.form.value.city);
    formData.append('panCard', this.form.value.pan);
    formData.append('adhar_front_side', this.form.value.aadhar);
    formData.append('adhar_back_side', this.form.value.backAadhar);
    formData.append('franchiseId', this.form.value.franchiseId);
    formData.append('password', this.form.value.password);

    this.userService.createFranchise(formData).subscribe({
      next: (response) => {
        if (response) {
          this.form.reset();
          this.toastr.success(response.message);
          this.router.navigate(['/statedashboard/franchise-list']);
        }
      },
      error: error => {
        console.log(error)
        this.toastr.error(error.error.message);
      }
    });
  }

  gotoList() {
    this.router.navigate(['/statedashboard/franchise-list']);
  }

  gotoDashboard() {
    this.router.navigate(['/statedashboard']);
  }
}
