import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ShareService } from 'src/app/shareService/share.service';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar'


@Component({
  selector: 'app-statehandlerlogin',
  templateUrl: './statehandlerlogin.component.html',
  styleUrls: ['./statehandlerlogin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StatehandlerloginComponent implements OnInit {
  spin = false;
  passwordFieldType: string = "password"; // Initial type is 'password'
  showPasswordIcon: string = "visibility"; // Initial icon is 'visibility'

  stateLoginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router:Router, private shareService: ShareService,private _snackBar:MatSnackBar) {
    this.stateLoginForm = this.formBuilder.group({
      stateId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.spin = true;
    console.log('Form submitted:', this.stateLoginForm.value);
    let data = {
      userid: this.stateLoginForm.value.stateId,
      password: this.stateLoginForm.value.password
    }
    
    this.userService.shoLogin(data).subscribe({
      next: (res: any) => {
        if (res) {
          console.log(res)
          this.spin = false;
          localStorage.setItem('stateHandlerId',res.user.stateHandlerId)
          localStorage.setItem('stateRefferalId',res.user.referralId)
          localStorage.setItem('userType', res.user.userType)
          this.shareService.setStateToken(res.token)
          this.router.navigate(['statedashboard']);
          setTimeout(function () {
            window.location.reload();
          }, 100);
          //this.toastr.success(response.message);
        }
      },
      error: error => {
        this.spin = false;
        console.log(error.error.message)
        // this.toastr.error(error.error.message);
        this._snackBar.open(error.error.message, 'Close', {
          duration: 3000, // Adjust the duration as needed (in milliseconds)
          horizontalPosition: 'center', // Horizontal position: 'start' | 'center' | 'end' | 'left' | 'right'
          verticalPosition: 'top',
          panelClass: ['custom-snackbar']
        });
      }
    })
    
  }


  SignUpState(){
   window.location.href = '/stateRegitration';
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

  home(){
    this.router.navigate([''])
  }

}
