import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import html2canvas from "html2canvas";
import * as jspdf from "jspdf";
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-rig-bond',
  templateUrl: './rig-bond.component.html',
  styleUrls: ['./rig-bond.component.css']
})
export class RigBondComponent implements OnInit {
@Input() id: string = "";
  liquidity:number=0;
  paymentDate:string="";
  aadharNumber:number=0;
  fixedShareAmountInString:string="";
  fixedSharePerDayAmount:number=0;
  fixedShareAmount:number=0;
  @ViewChild("contentToConvert")
  contentToConvert: ElementRef;
  hideContent = false;
  buttonText: string = "Download";
  isDownloading: boolean = false;
  
  constructor(private userService : UserService, private toastr : ToastrService) { }

  ngOnInit() {
    this.callApiToPartnerPayoutEveryMonth();
  }

  callApiToPartnerPayoutEveryMonth(){
    let data ={
      rigId : this.id
    }

    this.userService.callApiToFetchPartnerDetailsUsingRigID(data).subscribe({
      next: (result: any) => {
        const myString = result.data[0].rigId;
        const thirdChar = myString[2];
        if (thirdChar === "0") {
          this.aadharNumber = result.data[0].p_aadhar;
          if (result.data[0].p_liquidity === 1200000) {
            this.paymentDate = result.data[0].p_dop;
            this.fixedShareAmount = 128250;
            this.fixedSharePerDayAmount = 4500;
            this.liquidity = 1200000;
            this.fixedShareAmountInString = "Twelve lakh rupees only";
          } else if (result.data[0].p_liquidity === 600000) {
            this.fixedShareAmount = 64125;
            this.fixedSharePerDayAmount = 2250;
            this.fixedShareAmountInString = "Six lakh rupees only";
            this.paymentDate = result.data[0].p_dop;
            this.liquidity = 600000;
          } else if (result.data[0].p_liquidity === 300000) {
            this.fixedShareAmount = 38475;
            this.fixedSharePerDayAmount = 1350;
            this.fixedShareAmountInString = "Three lakh rupees only";
            this.paymentDate = result.data[0].p_dop;
            this.liquidity = 300000;
          } else if (result.data[0].p_liquidity === 200000) {
            this.fixedShareAmount = 25650;
            this.fixedSharePerDayAmount = 900;
            this.fixedShareAmountInString = "Two lakh rupees only";
            this.paymentDate = result.data[0].p_dop;
            this.liquidity = 200000;
          } else if (result.data[0].p_liquidity === 100000) {
            this.fixedShareAmount = 12825;
            this.fixedSharePerDayAmount = 450;
            this.fixedShareAmountInString = "One lakh rupees only";
            this.paymentDate = result.data[0].p_dop;
            this.liquidity = 100000;
          }
        } else {
          this.aadharNumber = result.data[0].adharNumber;
          if (result.data[0].liquidity === 1200000) {
            this.fixedShareAmount = 128250;
            this.fixedSharePerDayAmount = 4500;
            this.fixedShareAmountInString = "Twelve lakh rupees only";
            this.paymentDate = result.data[0].doj;
            this.liquidity = 1200000;
          } else if (result.data[0].liquidity === 600000) {
            this.fixedShareAmount = 64125;
            this.fixedSharePerDayAmount = 2250;
            this.fixedShareAmountInString = "Six lakh rupees only";
            this.paymentDate = result.data[0].doj;
            this.liquidity = 600000;
          } else if (result.data[0].liquidity === 300000) {
            this.fixedShareAmount = 38475;
            this.fixedSharePerDayAmount = 1350;
            this.fixedShareAmountInString = "Three lakh rupees only";
            this.paymentDate = result.data[0].doj;
            this.liquidity = 300000;
          } else if (result.data[0].liquidity === 200000) {
            this.fixedShareAmount = 25650;
            this.fixedSharePerDayAmount = 900;
            this.fixedShareAmountInString = "Two lakh rupees only";
            this.paymentDate = result.data[0].doj;
            this.liquidity = 200000;
          } else if (result.data[0].liquidity === 100000) {
            this.fixedShareAmount = 12825;
            this.fixedSharePerDayAmount = 450;
            this.fixedShareAmountInString = "One lakh rupees only";
            this.paymentDate = result.data[0].doj;
            this.liquidity = 100000;
          }
        }
      },
      error: () => {},
    });
  }

  downloadBond() {
    // Change button text and set downloading status
    this.buttonText = "Downloading...";
    this.isDownloading = true;

    const elementsToConvert = document.querySelectorAll(".bond-pdf-container");
    const pdf = new jsPDF(); // Create a new PDF instance

    elementsToConvert.forEach((element: HTMLElement, index: number) => {
      html2canvas(element).then((canvas) => {
        const imageData = canvas.toDataURL("image/png");

        if (index > 0) {
          pdf.addPage(); // Add new page for subsequent elements
        }

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, pdfHeight);

        // Check if this is the last element, then save the PDF
        if (index === elementsToConvert.length - 1) {
          pdf.save("bond.pdf");

          // Reset button text and downloading status
          this.buttonText = "Download";
          this.isDownloading = false;
        }
      });
    });
  }

}
