import { Component, OnInit, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogConfig,
  MatDialog,
} from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-member-summary-amount",
  templateUrl: "./member-summary-amount.component.html",
  styleUrls: ["./member-summary-amount.component.css"],
})
export class MemberSummaryAmountComponent implements OnInit {
  monthlyPayout: Number = 0;
  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.monthlyPayout = data;
  }

  ngOnInit() {}
}
