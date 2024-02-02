import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { UserService } from "src/app/service/user.service";
import { ShareService } from "src/app/shareService/share.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class UserLoginComponent implements OnInit {
  spin = false;
  heading: string = "Member";
  passwordFieldType: string = "password"; // Initial type is 'password'
  showPasswordIcon: string = "visibility";

  memberLoginForm: FormGroup;
  member_userid: string = "";
  member_password: string = "";

  otp_field: boolean = false;
  userid_field: boolean = true;
  new_password: boolean = false;
  otp: number;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private shareService: ShareService,
    private toastr: ToastrService
  ) {
    this.memberLoginForm = this.formBuilder.group({
      member_id: new FormControl(),
      member_password: new FormControl(),
    });
  }

  ngOnInit() {}

  submit(memberLoginForm) {
    this.spin = true;
    this.member_userid = memberLoginForm.controls.member_id.value;
    this.member_password = memberLoginForm.controls.member_password.value;
    let data = {
      m_userid: memberLoginForm.controls.member_id.value,
      m_password: memberLoginForm.controls.member_password.value,
    };
    this.userService.memberLogin(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.spin = false;
          console.log(response)
          this.shareService.setToken(response.token);
          this.shareService.setUserId(response.data[0].m_userid);
          this.shareService.setRefferID(response.data[0].reffer_id);
          localStorage.setItem('userType',response.data[0].userType);
          this.router.navigate(["memberdashboard"]);
          this.toastr.success("Logged in Successfully", "Success");
          setTimeout(function () {
            window.location.reload();
          }, 100);
        }
      },
      error: (error) => {
        this.spin = false;
        this.router.navigate(["memberlogin"]);
        this.toastr.error("Invalid User ID or Password", "Error");
      },
    });
  }

  SignUpMember() {
    // window.open( "/member-signup", "_parent");
    this.router.navigate(['/member-signup']);
  }

  SignUp(){
    this.router.navigate(['/member-signup1']);
  }
  backToHome(){
    window.location.href = 'https://centumworldrig.com';
  }

  sendOtp() {
    let data = {
      m_userid: this.member_userid,
    };
    this.userService.sendOtpForMemberForgetPassword(data).subscribe({
      next: (response) => {
        if (response) {
          this.toastr.success("OTP Sent...");
          this.otp_field = true;
          this.userid_field = false;
        }
      },
      error: (error) => {
        this.toastr.error("OTP not sent...");
      },
    });
  }

  verifyOtp() {
    let data = {
      m_userid: this.member_userid,
      otp: Number(this.otp),
    };
    this.userService.verifyOtpForMember(data).subscribe({
      next: (response) => {
        this.otp_field = false;
        this.new_password = true;
        this.toastr.success("OTP Veryfied");
      },
      error: (error) => {
        this.toastr.error("OTP not match!");
      },
    });
  }

  setPassword() {
    let data = {
      m_userid: this.member_userid,
      m_password: this.member_password,
    };

    this.userService.memberResetPasswordSave(data).subscribe({
      next: (response) => {
        this.new_password = false;
        this.userid_field = true;
        this.member_userid = "";
        this.toastr.success("Password reset successfully!");
        this.router.navigate(["memberlogin"]);
      },
      error: (error) => {
        this.toastr.error("Something went wrong!");
      },
    });
  }
  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === "password" ? "text" : "password";
    this.showPasswordIcon =
      this.showPasswordIcon === "visibility" ? "visibility_off" : "visibility";
  }
}
