import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "src/app/service/user.service";
import { ShareService } from "src/app/shareService/share.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-franchise-login",
  templateUrl: "./franchise-login.component.html",
  styleUrls: ["./franchise-login.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class FranchiseLoginComponent implements OnInit {
  franchiseLoginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private shareService: ShareService
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
    });
  }

  SignUpFranchise() {
    window.open("/franchiseSignUp");
  }
}
