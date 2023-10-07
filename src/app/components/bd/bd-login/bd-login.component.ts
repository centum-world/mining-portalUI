import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ShareService } from 'src/app/shareService/share.service';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-bd-login',
  templateUrl: './bd-login.component.html',
  styleUrls: ['./bd-login.component.css']
})
export class BdLoginComponent implements OnInit {

  passwordFieldType: string = "password"; // Initial type is 'password'
  showPasswordIcon: string = "visibility"; // Initial icon is 'visibility'

  stateLoginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private toastr:ToastrService, private userService: UserService, private router:Router, private shareService: ShareService,private _snackBar:MatSnackBar) {
    this.stateLoginForm = this.formBuilder.group({
      bdId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('Form submitted:', this.stateLoginForm.value);
    let data = {
      userid: this.stateLoginForm.value.bdId,
      password: this.stateLoginForm.value.password
    }
    
    this.userService.bdLogin(data).subscribe({
      next: (res: any) => {
        if (res) {
          
           localStorage.setItem('bdHandlerID',res.user.businessDeveloperId)
           localStorage.setItem('bdRefferalId',res.user.referralId)
          this.shareService.setBdToken(res.token)
          this.router.navigate(['bd-dashboard']);
          setTimeout(function () {
            window.location.reload();
          }, 100);
           console.log(res)
        }
      },
      error: error => {
        console.log(error.error.message)
         this.toastr.error(error.error.message);
      }
    })
    
  }


  SignUpBd(){
    window.open('/stateRegitration')
  }

  // logout
  logOut() {
    localStorage.removeItem('stateToken');
    localStorage.removeItem('stateHandlerId');
    localStorage.removeItem('stateRefferalId');
    // localStorage.removeItem('')
    localStorage.clear();

  }
  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === "password" ? "text" : "password";
    this.showPasswordIcon =
      this.showPasswordIcon === "visibility" ? "visibility_off" : "visibility";
  }

  
}
