import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/service/user.service";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-mining-account",
  templateUrl: "./mining-account.component.html",
  styleUrls: ["./mining-account.component.css"],
})
export class MiningAccountComponent implements OnInit {
  @ViewChild("contentToConvert", { static: false })
  contentToConvert: ElementRef;
  rigId: string = "";
  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe((params) => {
      this.rigId = params["id"];
    });
  }
  fname: string = "";
  lname: string = "";
  paymentDate: string = "";
  liquidity: number = 0;
  payableAmount: number = 0;
  payableCount: number = 0;
  payoutDate: string = "";
  status: Boolean = false;

  ngOnInit() {
    this.fetchPartnerDetails();
    this.callApiToPartnerPayoutEveryMonth();
  }

  fetchPartnerDetails() {
    let data = {
      rigId: this.rigId,
    };

    this.userService.callApiToFetchPartnerDetailsUsingRigID(data).subscribe({
      next: (result: any) => {
        const myString = result.data[0].rigId;
        const thirdChar = myString[2];
        console.log(thirdChar);
        if (thirdChar === "0") {
          console.log(result.data);
          this.fname = result.data[0].p_name;
          this.lname = result.data[0].p_lname;
          this.paymentDate = result.data[0].p_dop;
          this.status = result.data[0].partner_status;
        } else {
          console.log(result.data);
          this.fname = result.data[0].fname;
          this.lname = result.data[0].lname;
          this.paymentDate = result.data[0].doj;
          this.status = result.data[0].partner_status;
        }
      },
      error: (error) => {},
    });
  }

  callApiToPartnerPayoutEveryMonth() {
    let data = {
      rigId: this.rigId,
    };

    this.userService.callApiToPartnerPayout(data).subscribe({
      next: (res: any) => {
        console.log(res.data.length);
        if (res.data.length > 0) {
          this.liquidity = res.data[res.data.length - 1].liquidity;
          this.payoutDate = res.data[res.data.length - 1].payoutDate;
          this.payableCount = res.data[res.data.length - 1].payableCount;
          this.payableAmount = res.data[res.data.length - 1].payableAmount;
        }
      },

      error: (error) => {
        this.toastr.warning(error.error.message);
      },
    });
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

  gotoHome(){
    this.router.navigate(["/miningdashboard/home"]);
  }
}
