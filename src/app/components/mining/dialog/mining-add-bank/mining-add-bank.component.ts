import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "src/app/service/user.service";
import { MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-mining-add-bank",
  templateUrl: "./mining-add-bank.component.html",
  styleUrls: ["./mining-add-bank.component.css"],
})
export class MiningAddBankComponent implements OnInit {
  bankDetails = {
    holderName: "",
    bankName: "",
    branchName: "",
    accountNumber: "",
    ifscCode: "",
  };
  bankDetailsForm: FormGroup;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<MiningAddBankComponent>,
    private toastr: ToastrService
  ) {
    this.bankDetailsForm = this.formBuilder.group({
      holderName: ["", Validators.required],
      bankName: ["", Validators.required],
      branchName: ["", Validators.required],
      accountNumber: ["", Validators.required],
      ifscCode: ["", Validators.required],
    });
  }

  ngOnInit() {}

  saveBankDetails() {
    if (this.bankDetailsForm.valid) {
      const formData = this.bankDetailsForm.value;
      let data = {
        user_id: localStorage.getItem("partnerdetails"),
        holder_name: this.bankDetailsForm.value.holderName,
        account_no: this.bankDetailsForm.value.accountNumber,
        ifsc_code: this.bankDetailsForm.value.ifscCode,
        branch_name: this.bankDetailsForm.value.branchName,
        bank_name: this.bankDetailsForm.value.bankName,
      };
      this.userService.addMiningPartnerBankDetails(data).subscribe({
        next: (res: any) => {
          this.bankDetailsForm.reset();
          this.toastr.success(res.message);
          this.dialogRef.close();
        },
        error: (err) => {
          this.toastr.warning(err.error.message);
        },
      });
    } else {
    }
  }
}
