import { Component, OnInit } from "@angular/core";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserService } from "src/app/service/user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-partner-query",
  templateUrl: "./partner-query.component.html",
  styleUrls: ["./partner-query.component.css"],
})
export class PartnerQueryComponent implements OnInit {
  query = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.callApiToQuery();
  }

  callApiToQuery() {
    let data = {
      p_userid: this.data.p_userid,
    };
    this.userService.fetchQueery(data).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.query = res.data;
      },
      error: (err) => {
        this.toastr.warning(err.error.message);
      },
    });
  }

  onCheckboxChange(id: any, status: any) {
    console.log(id, status);
    let data = {
      id: id,
      status: status,
    };
    this.userService.changeQueryStatus(data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
        this.callApiToQuery();
      },
      error: (err) => {
        this.toastr.warning(err.error.message);
      },
    });
  }
}
