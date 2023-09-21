import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ShareService } from 'src/app/shareService/share.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-statehandlerlogin',
  templateUrl: './statehandlerlogin.component.html',
  styleUrls: ['./statehandlerlogin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StatehandlerloginComponent implements OnInit {

  stateLoginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.stateLoginForm = this.formBuilder.group({
      stateId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('Form submitted:', this.stateLoginForm.value);
  }


  SignUpState(){
    window.open('/stateRegitration')
  }


}
