import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { UserService } from "src/app/service/user.service";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";

@Component({
  selector: "app-mining-account",
  templateUrl: "./mining-account.component.html",
  styleUrls: ["./mining-account.component.css"],
})
export class MiningAccountComponent implements OnInit {
  @ViewChild("contentToConvert", { static: false })
  contentToConvert: ElementRef;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService
  ) {}
  fname: "";
  lname: "";
  perDayAmountDropDown = 0;
  partnerDetails = {
    partnerID: "",
    dop: "",
    liquidity: "",
    monthComplete: 0,
    lastPaymentDate: "",
    status: Boolean,
  };

  ngOnInit() {
    this.fetchMiningPartnerProfileDetails();
    this.lastApproveDate();
  }

  fetchMiningPartnerProfileDetails() {
    let partnerIdDetails = localStorage.getItem("partnerdetails");
    let data = {
      p_userid: partnerIdDetails,
    };
    this.userService.fetchMiningPartnerProfileDetails(data).subscribe({
      next: (res: any) => {
        this.fname = res.data[0].p_name.toUpperCase();
        this.lname = res.data[0].p_lname.toUpperCase();
        this.partnerDetails.partnerID = res.data[0].p_userid;
        this.partnerDetails.dop = res.data[0].p_dop;
        this.partnerDetails.liquidity = res.data[0].p_liquidity;
        this.partnerDetails.monthComplete = res.data[0].partner_count;

        if (res.data[0].p_liquidity === 600000) {
          this.perDayAmountDropDown = 67500 - (67500 * 5) / 100;
        } else if (res.data[0].p_liquidity === 300000) {
          this.perDayAmountDropDown = 40500 - (40500 * 5) / 100;
        } else if (res.data[0].p_liquidity === 200000) {
          this.perDayAmountDropDown = 27000 - (27000 * 5) / 100;
        } else if (res.data[0].p_liquidity === 100000) {
          this.perDayAmountDropDown = 13500 - (13500 * 5) / 100;
        } else if (res.data[0].p_liquidity === 1200000) {
          this.perDayAmountDropDown = 135000 - (135000 * 5) / 100;
        }
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  lastApproveDate() {
    let approveArray = [];
    let data = {
      p_userid: localStorage.getItem("partnerdetails"),
    };
    this.userService.partnerLastApproveDate(data).subscribe({
      next: (result: any) => {
        approveArray = Object.values(result.data);
        let lastPaymentOfIndex = approveArray.length;
        this.partnerDetails.lastPaymentDate =
          approveArray[lastPaymentOfIndex - 1].approve_date;
      },
    });
  }
  gotoHome() {
    this.router.navigate(["/miningdashboard/home"]);
  }

  downloadPaylout() {
    console.log(this.contentToConvert);
    if (this.contentToConvert) {
      const element = this.contentToConvert.nativeElement;
      const backgroundImage = new Image();
      backgroundImage.src = "path/to/your/background-image.jpg";

      html2canvas(element).then((canvas) => {
        const imgWidth = 210; // A4 size
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const contentDataURL = canvas.toDataURL("image/png");
        const pdf = new jspdf.jsPDF("p", "mm", "a4");
        let position = 0;

        pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
        pdf.save("payout.pdf");
      });
    }
  }
  // In your component class
  formatDate(date: Date | string): string {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (typeof date === "string") {
      date = new Date(date);
    }

    if (date instanceof Date && !isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = monthNames[date.getMonth()];
      return `${month} ${year}`;
    } else {
      return "Invalid Date";
    }
  }
}
