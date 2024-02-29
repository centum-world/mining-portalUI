import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/service/user.service";
import { MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-member-edit-bank",
  templateUrl: "./member-edit-bank.component.html",
  styleUrls: ["./member-edit-bank.component.css"],
})
export class MemberEditBankComponent implements OnInit {
  memberBank = {
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
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<MemberEditBankComponent>
  ) {
    this.bankDetailsForm = this.formBuilder.group({
      holderName: ["", Validators.required],
      bankName: ["", Validators.required],
      branchName: ["", Validators.required],
      accountNumber: ["", Validators.required],
      ifscCode: ["", Validators.required],
    });

  }

  ngOnInit() {

    this.fetchBankDetails()
  }

  fetchBankDetails() {
    let data = {
      user_id: localStorage.getItem("userdetail"),
    };
  
    this.userService.fetchMemberBankDetails(data).subscribe({
      next: (res: any) => {
        this.memberBank.holderName = res.data[0].holder_name;
  
        console.log(this.memberBank, "bank details");
  
        this.bankDetailsForm.patchValue({
          holderName: res.data[0].holder_name,
          bankName: res.data[0].bank_name,
          branchName: res.data[0].branch_name,
          accountNumber: res.data[0].account_no,
          ifscCode: res.data[0].ifsc_code,
        });
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }
  


  editMemberBank() {
      const formData = this.bankDetailsForm.value;

      let data = {
        user_id: localStorage.getItem("userdetail"),
        holder_name: this.bankDetailsForm.value.holderName,
        account_no: this.bankDetailsForm.value.accountNumber,
        ifsc_code: this.bankDetailsForm.value.ifscCode,
        branch_name: this.bankDetailsForm.value.branchName,
        bank_name: this.bankDetailsForm.value.bankName,
      };

      console.log(data);

      this.userService.editMemberBankDetails(data).subscribe({
        next: (res: any) => {
          console.log("API Response:", res);

          this.bankDetailsForm.reset();

          // Show a success toast using Toastr
          this.toastr.success("Bank details updated successfully!", "Success");

          this.dialogRef.close();
        },
        error: (error) => {
          this.toastr.error(error.error.message, 'Error');
        },
      });
    
  }
}
