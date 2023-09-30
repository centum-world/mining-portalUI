import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl,FormBuilder, FormGroup, Validators,AbstractControl, ValidatorFn } from '@angular/forms';
import { allState } from 'src/app/components/common/states';

@Component({
  selector: 'app-edit-franchise',
  templateUrl: './edit-franchise.component.html',
  styleUrls: ['./edit-franchise.component.css']
})
export class EditFranchiseComponent implements OnInit {
   states = allState.states;
  selected="Male"
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder) {
    console.log(data)
  }

  ngOnInit() {

  }

  

  editForm : FormGroup
  fname = new FormControl('',[Validators.required]);
  lname = new FormControl('',[Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', [
    Validators.required,
    Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')
  ]);
  gender = new FormControl('', Validators.required);
  state = new FormControl('',[Validators.required]);
  city = new FormControl([],Validators.required)

  

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  getErrorFnameMessage(){
    return this.fname.hasError('required') ? 'You must enter first name':''
  }
  getErrorLnameMessage(){
    return this.lname.hasError('required') ? 'You must enter last name':''
  }

  

}
