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

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router:Router, private shareService: ShareService) {
    this.stateLoginForm = this.formBuilder.group({
      stateId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('Form submitted:', this.stateLoginForm.value);
    let data = {
      userid: this.stateLoginForm.value.stateId,
      password: this.stateLoginForm.value.password
    }
    
    this.userService.shoLogin(data).subscribe({
      next: (res: any) => {
        if (res) {
          console.log(res.token)
          this.shareService.setStateToken(res.token)
          this.router.navigate(['statedashboard']);
          //this.toastr.success(response.message);
        }
      },
      error: error => {
        console.log(error)
        //this.toastr.error(error.error.message);
      }
    })
    
  }


  SignUpState(){
    window.open('/stateRegitration')
  }


}
