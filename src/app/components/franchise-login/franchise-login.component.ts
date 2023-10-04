import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "src/app/service/user.service";
import { ShareService } from "src/app/shareService/share.service";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: "app-franchise-login",
  templateUrl: "./franchise-login.component.html",
  styleUrls: ["./franchise-login.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class FranchiseLoginComponent implements OnInit {
  franchiseLoginForm: FormGroup;
  passwordFieldType: string = "password"; // Initial type is 'password'
  showPasswordIcon: string = "visibility"; // Initial icon is 'visibility'

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private shareService: ShareService,
    private _snackBar:MatSnackBar
  ) {
    this.franchiseLoginForm = this.formBuilder.group({
      franchiseId: ["", Validators.required],
      franchisePassword: ["", [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    let data = {
      userid: this.franchiseLoginForm.value.franchiseId,
      password: this.franchiseLoginForm.value.franchisePassword,
    };
    this.userService.franchiseLogin(data).subscribe({
      next: (res: any) => {
        if (res) {
          console.log(res);
          localStorage.setItem("franchiseId",res.user.franchiseId);
          localStorage.setItem("franchiseReferralId",res.user.referralId);
          this.shareService.setFranchiseToken(res.token);
          this.router.navigate(["franchisedashboard"]);
        }
      },
      error: error => {
        console.log(error.error.message)
        // this.toastr.error(error.error.message);
        this._snackBar.open(error.error.message, 'Close', {
          duration: 3000, // Adjust the duration as needed (in milliseconds)
          horizontalPosition: 'center', // Horizontal position: 'start' | 'center' | 'end' | 'left' | 'right'
          verticalPosition: 'top',
          panelClass: ['custom-snackbar']
        });
      }
    });
  }

  SignUpFranchise() {
    window.open("/franchiseSignUp");
  }
  logOut(){
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
