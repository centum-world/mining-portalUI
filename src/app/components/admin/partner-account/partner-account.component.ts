import { Component, OnInit, ElementRef, ViewChild,ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UserService } from "src/app/service/user.service";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material";
import { MatDialogConfig } from "@angular/material";
import { ConfirmApprovedComponent } from "../dialog/confirm-approved/confirm-approved.component";
import { Router } from "@angular/router";
import * as jspdf from "jspdf";
import { jsPDF } from "jspdf";

import html2canvas from "html2canvas";

@Component({
  selector: "app-partner-account",
  templateUrl: "./partner-account.component.html",
  styleUrls: ["./partner-account.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class PartnerAccountComponent implements OnInit {
  uploadText: string = 'Upload';
  isUploading: boolean = false;
  fileUploadForm: FormGroup;
  buttonText: string = "Download";
  isDownloading: boolean = false;

  @ViewChild("contentToConvert")
  contentToConvert: ElementRef;
  hideContent = false;
  status: boolean;
  partnerID: string;
  fname: "";
  lname: "";
  bankDetails = [];
  partnerRequestHistory = [];
  approvedRequest = [];
  referralRequestHistory = [];
  apprvedHistory = [];
  perDayAmountDropDown = 0;
  februaryAmount = 0;
  refferalAmount = 0;
  fixedShareAmount = 0;
  fixedSharePerDayAmount = 0;
  fixedShareAmountInString = "";
  dateOfLiquidityAdd: Date;
  aadharNumber: Number;
  paymentDate = null;
  perDayAmounReal = 0;
  liquidity = 0;
  percentage = 0;
  partnerDetails = {
    dop: "",
    liquidity: 0,
    monthComplete: 0,
    lastPaymentDate: "",
    status: false,
  };
  color = "accent";
  checked = false;
  disabled = false;
  pdfButton = true;
  allrig: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.partnerID = params["id"]; // Retrieve parameter 1
    });
  }

  ngOnInit() {
    this.tabChanged(0);
    this.referralTabChange(0);
    this.callApiToUserDetails();
  }

  selectedFile: File | null = null;

  selectFile(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSlideToggleChange() {
    this.checked = !this.checked; // Toggle the checked state
    console.log("Slide toggle changed:", this.checked);
  }

  tabChanged(event: any) {
    if (event === 3) {
      let data = {
        user_id: this.partnerID,
      };
      this.userService.fetchMiningPartnerBankDetails(data).subscribe({
        next: (res: any) => {
          this.bankDetails = res.data;
        },
        error: (error) => {
          this.toastr.warning(error.error.message);
        },
      });
    } else if (event === 1) {
      let data = {
        userId: this.partnerID,
      };

      this.userService.callApiToMultipleRig(data).subscribe({
        next:(response:any)=>{
          console.log(response.data)
          const newData = {
            fname: response.data[0].p_name,
            lname: response.data[0].p_lname,
            liquidity: response.data[0].p_liquidity,
            rigId: response.data[0].rigId,
          };
          response.data.unshift(newData);
          response.data.splice(1, 1);
          this.allrig = response.data;
        },
        error:(error:any)=>{

        }
      })
      // this.userService.perticularPartnerWithdrawalRequest(data).subscribe({
      //   next: (res: any) => {
      //     this.partnerRequestHistory = res.data;
      //   },
      //   error: (error) => {
      //     console.log(error.error.message);
      //   },
      // });

      console.log("hii")
    } else if (event === 2) {
      let data = {
        p_userid: this.partnerID,
      };
      this.userService.perticularPartnerWithdrawalHistory(data).subscribe({
        next: (res: any) => {
          this.approvedRequest = res.data;
        },
        error: (error) => {
          console.log(error.error.message);
        },
      });
    } else if (event === 0) {
      let data = {
        userId: this.partnerID,
      };
      this.userService.callApiToUniqepartnerDetails(data).subscribe({
        next: (res: any) => {
          this.fname = res.result[0].p_name;
          this.lname = res.result[0].p_lname;
          this.liquidity = res.result[0].p_liquidity;
          this.percentage = (this.liquidity * 18) / 100;
          this.partnerDetails.dop = res.result[0].p_dop;
          this.paymentDate = res.result[0].p_dop;
          this.partnerDetails.liquidity = res.result[0].p_liquidity;
          this.partnerDetails.monthComplete = res.result[0].month_count;
          this.partnerDetails.status = res.result[0].partner_status;
          this.dateOfLiquidityAdd = res.result[0].verifyDate;
          this.aadharNumber = res.result[0].p_aadhar;

          if (res.result[0].p_liquidity === 600000) {
            this.perDayAmountDropDown = 67500;
            this.februaryAmount = 63000;
            this.refferalAmount = 11000;
            this.fixedShareAmount = 64125;
            this.fixedSharePerDayAmount = 2250;
            this.fixedShareAmountInString = "Six lakh rupees only";
          } else if (res.result[0].p_liquidity === 300000) {
            this.perDayAmountDropDown = 40500;
            this.februaryAmount = 37800;
            this.refferalAmount = 5500;
            this.fixedShareAmount = 38475;
            this.fixedSharePerDayAmount = 1350;
            this.fixedShareAmountInString = "Three lakh rupees only";
          } else if (res.result[0].p_liquidity === 200000) {
            this.perDayAmountDropDown = 27000;
            this.februaryAmount = 25200;
            this.refferalAmount = 3700;
            this.fixedShareAmount = 25650;
            this.fixedSharePerDayAmount = 900;
            this.fixedShareAmountInString = "Two lakh rupees only";
          } else if (res.result[0].p_liquidity === 100000) {
            this.perDayAmountDropDown = 13500;
            this.februaryAmount = 12600;
            this.refferalAmount = 1850;
            this.fixedShareAmount = 12825;
            this.fixedSharePerDayAmount = 450;
            this.fixedShareAmountInString = "One lakh rupees only";
          } else if (res.result[0].p_liquidity === 1200000) {
            this.perDayAmountDropDown = 135000;
            this.februaryAmount = 124000;
            this.refferalAmount = 22000;
            this.fixedShareAmount = 128250;
            this.fixedSharePerDayAmount = 4500;
            this.fixedShareAmountInString = "Twelve lakh rupees only";
          }
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
    } else if (event === 4) {
      this.lastApproveDate();
    } else if (event === 5) {
    }else if (event === 6){

    }
  }

  callApiToUserDetails() {
    let data = {
      p_userid: this.partnerID,
    };
    this.userService.fetchPartnerDetailsForAdminUsingPartnerId(data).subscribe({
      next: (res: any) => {
        this.status = res.data[0].partner_status;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  onDateSelected(event: any) {
    const formattedDate = this.formatDate(event.value);
    this.paymentDate = formattedDate;
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Month is zero-based
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  onSelectChange(event: any) {
    this.perDayAmounReal = event.value;
  }

  approved(id: any) {
    let config: MatDialogConfig = {
      panelClass: "requsetApprovedDialogClass",
    };
    const dialogRef = this.dialog.open(ConfirmApprovedComponent, config);

    dialogRef.componentInstance.okClicked.subscribe(() => {
      let data = {
        p_userid: this.partnerID,
        id: id,
      };
      this.userService.approvedWithdrawalHistory(data).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message);
          this.tabChanged(1);
        },
        error: (err) => {
          this.toastr.warning(err.error.message);
        },
      });
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Closed");
    });
  }

  payNow() {
    let data = {
      p_userid: this.partnerID,
      partnerdate: this.paymentDate,
      perDayAmounReal: this.perDayAmounReal,
      refferal_Amount: this.refferalAmount,
    };
    this.userService.partnerPerDayAmountPaymentManually(data).subscribe({
      next: (result: any) => {
        this.toastr.success(result.message);
      },
      error: (error) => {
        if (error.error.status === 409) {
          this.toastr.warning("Aready paid to this date!", "Warning");
        }
        if (error.error.status === 422) {
          this.toastr.warning(error.error.message, "Warning");
        }
      },
    });
  }

  lastApproveDate() {
    let approveArray = [];
    let data = {
      p_userid: this.partnerID,
    };
    this.userService.partnerLastApproveDate(data).subscribe({
      next: (result: any) => {
        if (result && result.data && result.data.length > 0) {
          approveArray = Object.values(result.data);
          console.log(approveArray);
          let lastPaymentOfIndex = approveArray.length;
          this.partnerDetails.lastPaymentDate =
            approveArray[lastPaymentOfIndex - 1].approve_date;
        } else {
          // Handle the case where result.data is empty
          console.log("No data available.");
          // You can assign a default value to this.partnerDetails.lastPaymentDate if needed
          // this.partnerDetails.lastPaymentDate = someDefaultValue;
        }
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }

  referralTabChange(event: any) {
    if (event === 0) {
      let data = {
        userId: this.partnerID,
      };
      this.userService.partnerReferalRequst(data).subscribe({
        next: (res: any) => {
          this.referralRequestHistory = res.result;
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
    }
    if (event === 1) {
      let data = {
        userId: this.partnerID,
      };
      this.userService.fetchPartnerReferralPayout(data).subscribe({
        next: (res: any) => {
          this.apprvedHistory = res.result;
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
    }
  }
  goBack() {
    this.router.navigate(["/dashboard/partner-history"]);
  }

  referralPayoutApproved(id: any) {
    let data = {
      id: id,
    };
    this.userService.partnerReferralApproved(data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
        this.referralTabChange(0);
      },
      error: (err) => {
        console.log(err.error.message);
      },
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

  uploadPartnershipBond(): void {
    this.uploadText = 'Uploading...';
    this.isUploading = true;
    if (this.selectedFile) {
      console.log("Selected file:", this.selectedFile);

      const form = new FormData();
      form.append("bond", this.selectedFile);

      // Add Partner ID to the FormData object
      form.append("userId", this.partnerID);
      // console.log("Partner ID:", this.userId);

      this.userService.bondUpload(form).subscribe({
        next: (res: any) => {
          this.uploadText = 'Upload';
          this.isUploading = false;
          this.toastr.success(res.message);
          this.clearFileInput();

        },
        error: (err) => {
          this.toastr.warning(err.error.message);
        },
      });
    } else {
      this.toastr.error("No file selected");
    }
  }

  clearFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Clear the file input value
      this.selectedFile = null; // Reset the selected file
    }
  }
}
