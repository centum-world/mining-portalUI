import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-business-add-bank',
  templateUrl: './business-add-bank.component.html',
  styleUrls: ['./business-add-bank.component.css']
})
export class BusinessAddBankComponent implements OnInit {
  displayBusinessHandlerId = localStorage.getItem('bdHandlerID')

  bankDetails = {
    holderName: '',
    bankName: '',
    branchName: '',
    accountNumber: '',
    ifscCode: ''
  };
  bankDetailsForm: FormGroup;

  constructor(private userService:UserService , private formBuilder: FormBuilder,
    private _snackBar:MatSnackBar,
    private dialogRef: MatDialogRef<BusinessAddBankComponent>) {
      this.bankDetailsForm = this.formBuilder.group({
        holderName: ['', Validators.required],
        bankName: ['', Validators.required],
        branchName: ['', Validators.required],
        accountNumber: ['', Validators.required],
        ifscCode: ['', Validators.required]
      });
     }

  ngOnInit() {
  }

  saveBankDetails() {
    console.log("button pressed")
    if (this.bankDetailsForm.valid) {
      // Collect form data and send it to your API or service for saving
      const formData = this.bankDetailsForm.value;

      console.log('Form data submitted:', formData);
      let data = {
        user_id: localStorage.getItem('bdHandlerID'),
        holder_name: this.bankDetailsForm.value.holderName,
        account_no: this.bankDetailsForm.value.accountNumber,
        ifsc_code: this.bankDetailsForm.value.ifscCode,
        branch_name: this.bankDetailsForm.value.branchName,
        bank_name: this.bankDetailsForm.value.bankName

      }


      this.userService.saveBankDetailsForBusiness(data).subscribe({
        next: (res) => {
          console.log(res)
          this.bankDetailsForm.reset();
          this._snackBar.open('Bank details saved successfully!', 'Close', {
            duration: 3000, // Adjust the duration as needed (in milliseconds)
            horizontalPosition: 'center', // Horizontal position: 'start' | 'center' | 'end' | 'left' | 'right'
            verticalPosition: 'top',
          });
          this.dialogRef.close();
        }
      })
      error: () => {
      }

    } else {
      // Form is invalid, display error messages or take appropriate action
    }
  }

}
