import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/service/user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-account-sho",
  templateUrl: "./account-sho.component.html",
  styleUrls: ["./account-sho.component.css"],
})
export class AccountShoComponent implements OnInit {
  shoID: string;
  bankDetails = [];
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe((params) => {
      this.shoID = params["id"]; // Retrieve parameter 1
      console.log(this.shoID);
    });
  }

  ngOnInit() {
    console.log(this.shoID);
  }

  tabChanged(event: any) {
    if (event === 2) {
      console.log("event call 2");
      let data = {
        userId: this.shoID,
      };
      this.userService.fetchStateBankDetails(data).subscribe({
        next: (res: any) => {
          console.log(res.result);
          this.bankDetails = res.result;
        },
        error: (error) => {
          this.toastr.warning(error.error.message);
        },
      });
    } else if (event === 0) {
    }
  }
}
