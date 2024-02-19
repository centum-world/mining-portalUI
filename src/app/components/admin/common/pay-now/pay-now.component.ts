import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-pay-now",
  templateUrl: "./pay-now.component.html",
  styleUrls: ["./pay-now.component.css"],
})
export class PayNowComponent implements OnInit {
  @Input() id: string = "";
  @Input() userId: string = "";
  perDayAmountDropDown: Number = 0;
  februaryAmount: Number = 0;
  realAmount: Number = 0;
  payableDate: String = "";
  totalLiquidity:Number = 0;
  myForm: FormGroup;
  bankDetails : [] = [];
  constructor(private userService: UserService, private toastr:ToastrService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      selectedAmount: ["", Validators.required],
      payoutDate: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.callApiToPrtnerDetails();
    this.partnerBankDetails();
  }

  callApiToPrtnerDetails() {
    console.log(this.id);
    let data = {
      rigId: this.id,
    };
    this.userService.callApiToFetchPartnerDetailsUsingRigID(data).subscribe({
      next: (result: any) => {
        const myString = result.data[0].rigId;
        const thirdChar = myString[2];
        if (thirdChar === "0") {
          if (result.data[0].p_liquidity === 1200000) {
            this.perDayAmountDropDown = 135000;
            this.februaryAmount = 124000;
            this.totalLiquidity = 1200000;
          } else if (result.data[0].p_liquidity === 600000) {
            this.perDayAmountDropDown = 67500;
            this.februaryAmount = 63000;
            this.totalLiquidity = 600000;
          } else if (result.data[0].p_liquidity === 300000) {
            this.perDayAmountDropDown = 40500;
            this.februaryAmount = 37800;
            this.totalLiquidity = 300000;
          } else if (result.data[0].p_liquidity === 200000) {
            this.perDayAmountDropDown = 27000;
            this.februaryAmount = 25200;
            this.totalLiquidity = 200000;
          } else if (result.data[0].p_liquidity === 100000) {
            this.perDayAmountDropDown = 13500;
            this.februaryAmount = 12600;
            this.totalLiquidity = 100000;
          }
        } else {
          if (result.data[0].liquidity === 1200000) {
            this.perDayAmountDropDown = 135000;
            this.februaryAmount = 124000;
            this.totalLiquidity = 1200000;
          } else if (result.data[0].liquidity === 600000) {
            this.perDayAmountDropDown = 67500;
            this.februaryAmount = 63000;
            this.totalLiquidity = 600000;
          } else if (result.data[0].liquidity === 300000) {
            this.perDayAmountDropDown = 40500;
            this.februaryAmount = 37800;
            this.totalLiquidity = 300000;
          } else if (result.data[0].liquidity === 200000) {
            this.perDayAmountDropDown = 27000;
            this.februaryAmount = 25200;
            this.totalLiquidity = 200000;
          } else if (result.data[0].liquidity === 100000) {
            this.perDayAmountDropDown = 13500;
            this.februaryAmount = 12600;
            this.totalLiquidity = 100000;
          }
        }
      },
      error: () => {},
    });
  }

  onSelectChange(event: any) {
    this.perDayAmountDropDown = event.value;
  }

  onDateSelected(event: any) {
    this.payableDate = this.formatDate(event.value);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  paymentthismonth() {
    console.log(this.myForm.value.selectedAmount, this.payableDate, this.totalLiquidity);
    let data = {
      rigId: this.id,
      payableAmount: this.myForm.value.selectedAmount,
      payoutDate: this.payableDate,
      liquidity : this.totalLiquidity,
    };
    
    this.userService.callApiToPayForEachMonth(data).subscribe({
      next:(res:any)=>{
        this.toastr.success(res.message);
        console.log(res.message)
      },
      error:(error)=>{
        this.toastr.warning(error.error.message)
        console.log(error.error.message)
      }
    })
  }

  partnerBankDetails(){
    let data = {
      userId : this.userId
    }
    this.userService.callApiToPartnerBankDetails(data).subscribe({
      next:(res:any)=>{
        console.log(res.result);
        this.bankDetails = res.result;
      },
      error:(error)=>{
        this.toastr.warning(error.error.message)
      }
    })
  }
}
