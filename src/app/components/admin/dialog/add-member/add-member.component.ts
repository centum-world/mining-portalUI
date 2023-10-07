import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  memberDetails= {
    firstName:'',
    lastName:'',
    phone:'',
    address:'',
    referred_id:'',
    state:'',
    email:'',
    designation:'',
    qualification:'',
    gender:'',
    experience:'',
    salary:'',
    dob:'',
    doj:'',
    memberId:'',
    password:''
  }
  memberDetailsForm: FormGroup;

  constructor(private userService:UserService,private formBuilder: FormBuilder, 
    private _snackBar:MatSnackBar,
    public dialogRef: MatDialogRef<AddMemberComponent>) {
    // Initialize the form group with form controls
    this.memberDetailsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.pattern('^\\+91\\d{10}$')],
      address: [''],
      referred_id: [''],
      state: [''],
      email: [''],
      designation: [''],
      qualification: [''],
      gender: [''],
      experience: [''],
      salary: [''],
      dob: [''],
      doj: [''],
      memberId: [''],
      password: ['']
    });
  }

  ngOnInit() {
  }
  onSaveMemberDetails() {
    // console.log(this.memberDetailsForm.value)
    if (this.memberDetailsForm.valid) {
      // Collect form data and send it to your API or service for saving
      const formData = this.memberDetailsForm.value;

      console.log('Form data submitted:', formData);
      let data = {
      m_name: this.memberDetailsForm.value.firstName,
      m_lname: this.memberDetailsForm.value.lastName,
      m_phone: this.memberDetailsForm.value.phone,
      m_add: this.memberDetailsForm.value.address,
      m_refferid: this.memberDetailsForm.value.referred_id,
      m_state: this.memberDetailsForm.value.state,
      m_email: this.memberDetailsForm.value.email,
      m_designation: this.memberDetailsForm.value.designation,
      m_quali: this.memberDetailsForm.value.qualification,
      m_gender: this.memberDetailsForm.value.gender,
      m_exp: this.memberDetailsForm.value.experience,
      m_salary: this.memberDetailsForm.value.salary,
      m_dob: this.memberDetailsForm.value.dob,
      m_doj: this.memberDetailsForm.value.doj,
      m_userid: this.memberDetailsForm.value.memberId,
      m_password: this.memberDetailsForm.value.password

      }


      this.userService.createMember(data).subscribe({
        next: (res) => {
          this.memberDetailsForm.reset();
          this._snackBar.open('Member added successfully!', 'Close', {
            duration: 3000, // Adjust the duration as needed (in milliseconds)
            horizontalPosition: 'center', // Horizontal position: 'start' | 'center' | 'end' | 'left' | 'right'
            verticalPosition: 'top',
          });
          this.dialogRef.close();
        }
      })
      error: () => {

      }

    } else {
      // Form is invalid, display error messages or take appropriate action
    }
  }
 
  
}
