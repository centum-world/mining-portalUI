import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ShareService } from 'src/app/shareService/share.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  admin_userid: string = "";
  admin_password: string = "";

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private shareService: ShareService,
    private toastr: ToastrService
  ) {

    this.loginForm = formBuilder.group({
      admin_id: new FormControl(),
      admin_password: new FormControl(),
    })

  }


  msa: string = "";
  submit(loginForm) {
    this.admin_userid = loginForm.controls.admin_id.value;
    this.admin_password = loginForm.controls.admin_password.value;
    let data = {
      user_id: loginForm.controls.admin_id.value,
      password: loginForm.controls.admin_password.value




    }
    // console.log(data);
    this.userService.login(data).subscribe({

      next: result => {
        if (result) {
          var data = Object.values(result);

          this.shareService.setToken(data[0]);

          this.toastr.success('Login suceessfull', 'success');
          this.router.navigate(['dashboard']);

          setTimeout(function () {
            window.location.reload();
          }, 100);
        }
      },
      error: error => {

        this.toastr.error("Invalid User Id or Password", 'Error');
        this.router.navigate(['login']);

      }
    });

  }


  ngOnInit() {
  }

}
