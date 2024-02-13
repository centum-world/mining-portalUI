import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/service/user.service";
@Component({
  selector: "app-member-promotion",
  templateUrl: "./member-promotion.component.html",
  styleUrls: ["./member-promotion.component.css"],
})
export class MemberPromotionComponent implements OnInit {
  panelOpenState: false;
  referAndEarn = [];
  usertype = localStorage.getItem("userType");
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.callApiToReferralEarn();
  }

  callApiToReferralEarn() {
    let data = {
      userid: localStorage.getItem("userdetail"),
      userType: this.usertype,
    };

    this.userService.callApiToReferralAndEarn(data).subscribe({
      next: (res: any) => {
        this.referAndEarn = res.data;
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }

  gotohome() {
    this.router.navigate(["/memberdashboard/home"]);
  }
}
