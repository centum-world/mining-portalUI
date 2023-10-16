import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-signup-member',
  templateUrl: './signup-member.component.html',
  styleUrls: ['./signup-member.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupMemberComponent implements OnInit {
  aadharImage: null;
  aadharBackImage:null;
  panImage:null;
  aadharImageName: string=''; 
  backAadharImageName:string='';
  panImageName:string='';
  constructor(private userService: UserService,
     private toastr: ToastrService,
      private activeRoute: ActivatedRoute,
      private sanitizer: DomSanitizer
      ) { }


  public userExperience = [
    { name: '1 Year' },
    { name: '2 Year' },
    { name: '3 Year' },
    { name: 'More then 3 year' }
  ];
  createMember = {
    refferal_id: ''
  }
  b: string = '';
  ngOnInit() {
    this.activeRoute.queryParams.subscribe(data => {
      this.b = data['refferId'];
    })
  }

  signForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    lname: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required, Validators.maxLength(13),
    Validators.minLength(13), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    address: new FormControl("", [Validators.required]),
    reffered_id: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    designation: new FormControl("", Validators.required),
    qualification: new FormControl("", Validators.required),
    gender: new FormControl("", [Validators.required]),
    experiance: new FormControl("", [Validators.required]),
    salary: new FormControl("", [Validators.required]),
    dob: new FormControl("", [Validators.required]),
    doj: new FormControl("", [Validators.required]),
    aadhar: new FormControl(['', Validators.required]),
    user_id: new FormControl("", [Validators.required]),
    user_password: new FormControl("", [Validators.required])

  });

  addMemberData(userForm:any) {
    console.log(this.aadharImage, this.aadharBackImage, this.panImage)
    this.createMember.refferal_id = this.signForm.value.user_id + Math.floor(Math.random() * 100000);
    const form = new FormData();
    form.append('m_name', this.signForm.value.name);
    form.append('m_lname', this.signForm.value.lname);
    form.append('m_phone', this.signForm.value.phone);
    form.append('m_add', this.signForm.value.address);
    form.append('m_refferid', this.signForm.value.reffered_id);
    form.append('m_state',this.signForm.value.state);
    form.append('m_email',this.signForm.value.email);
    form.append('m_designation', this.signForm.value.designation);
    form.append('m_quali', this.signForm.value.qualification);
    form.append('m_gender', this.signForm.value.gender);
    form.append('m_exp', this.signForm.value.experiance)
    form.append('m_salary', this.signForm.value.salary);
    form.append('m_dob',this.signForm.value.dob);
    form.append('m_doj', this.signForm.value.doj);
    form.append('m_userid', this.signForm.value.user_id);
    form.append('m_password', this.signForm.value.user_password);
    form.append('reffer_id', this.createMember.refferal_id);
    form.append('adhar_front_side', this.aadharImage);
    form.append('adhar_back_side', this.aadharBackImage);
    form.append('panCard',this.panImage);
    this.userService.signUpMember(form).subscribe({
      next: result => {
        if (result) {
          this.toastr.success('Member Created Successfully!', 'Success');
          userForm.reset();
        }
      },
      error: error => {
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

}
