import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.css"],
})
export class InvoiceComponent implements OnInit {
  @Input() id: string = "";
  fname: string = "";
  lname: string = "";
  liquidity: number = 0;
  percentage: number = 0;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.callApiToRigPartner();
  }

  callApiToRigPartner() {
    let data = {
      rigId: this.id,
    };
    this.userService.callApiToFetchPartnerDetailsUsingRigID(data).subscribe({
      next: (res: any) => {
        const myString = res.data[0].rigId;
        const thirdChar = myString[2];
        if (thirdChar === "0") {
          this.fname = res.data[0].p_name;
          this.lname = res.data[0].p_lname;
          this.liquidity = res.data[0].p_liquidity;
          this.percentage = (this.liquidity * 18) / 100;
        } else {
          console.log(res.data[0]);
          this.fname = res.data[0].fname;
          this.lname = res.data[0].lname;
          this.liquidity = res.data[0].liquidity;
          this.percentage = (this.liquidity * 18) / 100;
        }
      },
      error: (error) => {},
    });
  }
}
