import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import html2canvas from "html2canvas";
import * as jspdf from "jspdf";
import { jsPDF } from "jspdf";

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
  verifyDate:string='';

  @ViewChild("contentToConvert")
  contentToConvert: ElementRef;
  hideContent = false;
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
          this.verifyDate = res.data[0].verifyDate;
        } else {
          console.log(res.data[0]);
          this.fname = res.data[0].fname;
          this.lname = res.data[0].lname;
          this.liquidity = res.data[0].liquidity;
          this.percentage = (this.liquidity * 18) / 100;
          this.verifyDate = res.data[0].verifyDate;
        }
      },
      error: (error) => {},
    });
  }

  downloadPdf() {
    if (!this.hideContent && this.contentToConvert) {
      const element = this.contentToConvert.nativeElement;
      html2canvas(element).then((canvas) => {
        const imgWidth = 210; // A4 size
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const contentDataURL = canvas.toDataURL("image/png");
        const pdf = new jspdf.jsPDF("p", "mm", "a4");
        let position = 0;

        pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
        pdf.save("generated_pdf.pdf");
      });
    }
  }
}
