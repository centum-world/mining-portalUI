import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "src/app/service/user.service";
import { MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: "app-member-add-bank",
  templateUrl: "./member-add-bank.component.html",
  styleUrls: ["./member-add-bank.component.css"],
})
export class MemberAddBankComponent implements OnInit {
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
    private dialogRef: MatDialogRef<MemberAddBankComponent>
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
        user_id: localStorage.getItem("userdetail"),
        holder_name: this.bankDetailsForm.value.holderName,
        account_no: this.bankDetailsForm.value.accountNumber,
        ifsc_code: this.bankDetailsForm.value.ifscCode,
        branch_name: this.bankDetailsForm.value.branchName,
        bank_name: this.bankDetailsForm.value.bankName,
      };

      this.userService.addMemberBankDetails(data).subscribe({
        next: (res) => {
          this.bankDetailsForm.reset();
      
          // Show a success toast using Toastr
          this.toastr.success('Bank details saved successfully!', 'Success');
      
          this.dialogRef.close();
        },
        error: (error) => {
          console.log(error.error.message);
          this.toastr.error(error.error.message, 'Error');
        },
      });
      
    } else {
    }
  }
}
