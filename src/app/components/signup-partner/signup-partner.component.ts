import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-signup-partner',
  templateUrl: './signup-partner.component.html',
  styleUrls: ['./signup-partner.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupPartnerComponent implements OnInit {
  passwordFieldType: string = "password"; // Initial type is 'password'
  showPasswordIcon: string = "visibility"; 
  spin = false;
  role:"";
  aadharImage: null;
  aadharBackImage:null;
  panImage:null;
  aadharImageName: string=''; 
  backAadharImageName:string='';
  panImageName:string='';
  createMiningPartner = {
    refferal_id: ''
  }
  b: string = '';
  partnerSignUpForm: FormGroup;
  constructor(private userService: UserService,private formBuilder: FormBuilder, private toastr: ToastrService, private activeRoute: ActivatedRoute,private router: Router) {
    this.activeRoute.queryParams.subscribe(data => {
      this.b = data['refferId'];
      console.log(this.b);
    })
    this.partnerSignUpForm = this.formBuilder.group({
      reffered_id: new FormControl(this.b, [Validators.required]),
      name: new FormControl("", [Validators.required]),
      lname: new FormControl("", [Validators.required]),
      aadhar: new FormControl("", [Validators.required, Validators.maxLength(12),
      Validators.minLength(12)]),
      phone: new FormControl("", [Validators.required, Validators.maxLength(13),
      Validators.minLength(13), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      email: new FormControl("", [Validators.required, Validators.email]),
      address: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      dob: new FormControl("", [Validators.required]),
      nominee_name: new FormControl("", [Validators.required]),
      nominee_aadhar: new FormControl("", [Validators.required,
      Validators.maxLength(12), Validators.minLength(12)]),
      nominee_phone: new FormControl("", [Validators.required, Validators.maxLength(13),
      Validators.minLength(13), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      dop: new FormControl("", [Validators.required]),
      liquidity: new FormControl("", [Validators.required]),
      terms : new FormControl({ value: '12 Months', disabled: true }, Validators.required),
      user_id: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {
    
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === "password" ? "text" : "password";
    this.showPasswordIcon =
      this.showPasswordIcon === "visibility" ? "visibility_off" : "visibility";
  }

  

  addPartnerData(form : FormGroup) {
    this.spin = true;
    console.log(this.aadharImage, this.aadharBackImage, this.panImage)
    console.log(form.value)
    this.createMiningPartner.refferal_id = this.partnerSignUpForm.value.user_id + Math.floor(Math.random() * 100000);
    //console.log(this.b);
    let a = '';
    if (this.b === '' || this.b === undefined) {

      a = this.partnerSignUpForm.value.reffered_id;
    }
    else {
      a = this.b
    }

     const formData = new FormData();
    formData.append('p_reffered_id', a);
    formData.append('p_name', this.partnerSignUpForm.value.name);
    formData.append('p_lname', this.partnerSignUpForm.value.lname);
    formData.append('p_aadhar', this.partnerSignUpForm.value.aadhar);
    formData.append('p_phone',this.partnerSignUpForm.value.phone);
    formData.append('p_email',  this.partnerSignUpForm.value.email);
    formData.append('p_address', this.partnerSignUpForm.value.address);
    formData.append('p_state',this.partnerSignUpForm.value.state);
    formData.append('p_dob',this.partnerSignUpForm.value.dob);
    formData.append('p_nominee_name', this.partnerSignUpForm.value.nominee_name);
    formData.append('p_nominee_aadhar', this.partnerSignUpForm.value.nominee_aadhar);
    formData.append('p_nominee_phone', this.partnerSignUpForm.value.nominee_phone);
    formData.append('p_dop',this.partnerSignUpForm.value.dop);
    formData.append('p_liquidity',this.partnerSignUpForm.value.liquidity);
    formData.append('terms', this.partnerSignUpForm.value.terms);
    formData.append('p_userid', this.partnerSignUpForm.value.user_id);
    formData.append('p_password', this.partnerSignUpForm.value.password);
    formData.append('p_refferal_id', this.createMiningPartner.refferal_id)
    formData.append('adhar_front_side', this.aadharImage);
    formData.append('adhar_back_side', this.aadharBackImage);
    formData.append('panCard',this.panImage);
    formData.append('role',this.role);
  
    this.userService.signUpPartner(formData).subscribe({
      next: response => {
        if (response) {
          this.toastr.success('Data submitted successfully', 'Success');
            form.reset();
            this.spin = false;
          this.router.navigate(['/mininglogin']);
        }
      },
      error: error => {
        this.spin = false;
        this.toastr.error(error.error.message);
      }
    })
    
  }

  onAadharImageChange(event: any, imageType:any) {
    if(imageType === 'front'){
      const file = event.target.files[0];
      this.aadharImageName = file.name;
      this.aadharImage = file;
    }else if(imageType === 'back'){
      const file = event.target.files[0];
      this.aadharBackImage = file.name;
      this.aadharBackImage = file;
    }else if(imageType === 'pan'){
      const file = event.target.files[0];
      this.panImageName = file.name;
      this.panImage = file;
    } 
  }

  gotoLogin(){
    this.router.navigate(['/mininglogin'])
  }

  backToHome(){
    window.location.href = 'https://centumworldrig.com';
  }
}
