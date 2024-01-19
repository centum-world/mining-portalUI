import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { UserService } from "src/app/service/user.service";
import { ShareService } from "src/app/shareService/share.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-mining-login",
  templateUrl: "./mining-login.component.html",
  styleUrls: ["./mining-login.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class MiningLoginComponent implements OnInit {
  spin = false;
  passwordFieldType: string = "password"; // Initial type is 'password'
  showPasswordIcon: string = "visibility"; // Initial icon is 'visibility'

  partnerLoginForm: FormGroup;
  partner_userid: string = "";
  partner_password: string = "";

  userid_field: boolean = true;
  otp_field: boolean = false;
  new_password: boolean = false;
  otp: number;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private shareService: ShareService,
    private toastr: ToastrService
  ) {
    this.partnerLoginForm = this.formBuilder.group({
      partner_id: new FormControl(),
      partner_password: new FormControl(),
    });
  }
  ngOnInit() {}

  submit(partnerLoginForm) {
    this.spin = true;
    this.partner_userid = partnerLoginForm.controls.partner_id.value;
    this.partner_password = partnerLoginForm.controls.partner_password.value;
    let data = {
      p_userid: partnerLoginForm.controls.partner_id.value,
      p_password: partnerLoginForm.controls.partner_password.value,
    };

    this.userService.partnerLogin(data).subscribe({
      next: (response: any) => {
        if (response) {
          localStorage.setItem('login','true');
          this.spin = false;
          this.shareService.setPartnerId(response.data[0].p_userid);
          this.shareService.setMiningPartnerRefferId(
            response.data[0].p_refferal_id
          );
          this.shareService.setMiningPartnerLiquidity(
            response.data[0].p_liquidity
          );
          this.shareService.setToken(response.token);
          this.toastr.success("Logged In Successfully", "success");
          this.router.navigate(["miningdashboard"]);
          setTimeout(function () {
            window.location.reload();
          }, 100);
        }
      },
      error: (error) => {
        this.spin = false;
        this.toastr.error("Invalid User ID Or Password ", "Error");
      },
    });
  }

  SignUpPartner() {
    window.open("/partner-signup");
  }

  sendOtp() {
    let data = {
      p_userid: this.partner_userid,
    };
    this.userService.sendOtpForPartnerForgetPassword(data).subscribe({
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
      p_userid: this.partner_userid,
      otp: Number(this.otp),
    };
    this.userService.verifyOtpForPartner(data).subscribe({
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
      p_userid: this.partner_userid,
      p_password: this.partner_password,
    };

    this.userService.partnerResetPasswordSave(data).subscribe({
      next: (response) => {
        this.new_password = false;
        this.userid_field = true;
        this.partner_userid = "";
        this.toastr.success("Password reset successfully!");
        this.router.navigate(["mininglogin"]);
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
  
  signup(){
    this.router.navigate(['/partner-signup'])
  }

  backToHome(){
    window.location.href = 'https://centumworldrig.com';
  }
}
