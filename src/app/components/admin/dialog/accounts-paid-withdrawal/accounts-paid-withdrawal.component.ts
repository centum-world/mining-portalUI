import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-accounts-paid-withdrawal",
  templateUrl: "./accounts-paid-withdrawal.component.html",
  styleUrls: ["./accounts-paid-withdrawal.component.css"],
})
export class AccountsPaidWithdrawalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AccountsPaidWithdrawalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
  closeModal(): void {
    this.dialogRef.close();
  }
}
