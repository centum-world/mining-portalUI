import { Component, OnInit } from "@angular/core";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserService } from "src/app/service/user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-my-query",
  templateUrl: "./my-query.component.html",
  styleUrls: ["./my-query.component.css"],
})
export class MyQueryComponent implements OnInit {
  query = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    console.log(data);
  }

  ngOnInit() {
    this.callApiToQuery();
  }

  callApiToQuery() {
    let data = {
      p_userid: this.data,
    };
    this.userService.fetchQueery(data).subscribe({
      next: (res: any) => {
        this.query = res.data;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }
}
