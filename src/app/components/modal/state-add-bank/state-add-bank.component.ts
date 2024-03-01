import { Component, OnInit } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "src/app/service/user.service";
import { MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-state-add-bank",
  templateUrl: "./state-add-bank.component.html",
  styleUrls: ["./state-add-bank.component.css"],
})
export class StateAddBankComponent implements OnInit {
  displayStateHandlerId = localStorage.getItem("stateHandlerId");

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
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<StateAddBankComponent>
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

  saveBankDetails(item:any) {
    if (this.bankDetailsForm.valid) {
      // Collect form data and send it to your API or service for saving
      const formData = this.bankDetailsForm.value;
      let data = {
        user_id: localStorage.getItem("stateHandlerId"),
        holder_name: this.bankDetailsForm.value.holderName,
        account_no: this.bankDetailsForm.value.accountNumber,
        ifsc_code: this.bankDetailsForm.value.ifscCode,
        branch_name: this.bankDetailsForm.value.branchName,
        bank_name: this.bankDetailsForm.value.bankName,
      };

      this.userService.saveBankDetails(data).subscribe({
        next: (res) => {
          this.bankDetailsForm.reset();
          this.toastr.success("Bank details added successfully!", "Success");
          this.dialogRef.close();
        },
        error: (error) => {
          console.log(error.error.message);

          this.toastr.error(error.error.message, 'Error');

        },
      });
    } else {
      // Form is invalid, display error messages or take appropriate action
    }
  }
}
