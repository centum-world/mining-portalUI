import { Component, OnInit } from "@angular/core";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA,MatDialogRef } from "@angular/material/dialog";
import { UserService } from "src/app/service/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-myteam-admin",
  templateUrl: "./myteam-admin.component.html",
  styleUrls: ["./myteam-admin.component.css"],
})
export class MyteamAdminComponent implements OnInit {
  amountForm: FormGroup;
  referralData = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MyteamAdminComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    console.log(data.memberData, data.type, data.referral_id);
  }

  ngOnInit(): void {
    this.amountForm = this.formBuilder.group({
      amount: ["", Validators.required],
      paymentDate: ["", Validators.required]
    });
  }

  submitForm() {
    console.log(this.data.memberData, this.data.type);
    if (this.data.type === "single") {
      this.referralData = {
        userId: this.data.memberData.p_userid,
        name: this.data.memberData.p_name + " " + this.data.memberData.p_lname,
        rigId: this.data.memberData.rigId,
        referralId: this.data.referral_id,
        liquidity: this.data.memberData.p_liquidity,
        doj: this.data.memberData.p_dop,
        amount: Number(this.amountForm.controls["amount"].value),
        dateOfPayment: this.amountForm.controls["paymentDate"].value
      };
      console.log(this.referralData);
    } else {
      this.referralData = {
        userId: this.data.memberData.userId,
        name: this.data.memberData.fname + " " + this.data.memberData.lname,
        rigId: this.data.memberData.rigId,
        referralId: this.data.referral_id,
        liquidity: this.data.memberData.liquidity,
        doj: this.data.memberData.doj,
        amount: Number(this.amountForm.controls["amount"].value),
        dateOfPayment: this.amountForm.controls["paymentDate"].value
      };
    }
    this.userService.callApiToGiveReferralMoney(this.referralData).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
        console.log(res.message);
        this.dialogRef.close();
        this.amountForm.reset();
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message);
      },
    });
  }
}
