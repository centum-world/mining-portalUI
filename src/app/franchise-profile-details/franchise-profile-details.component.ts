import { Component, OnInit } from "@angular/core";
import { UserService } from "../service/user.service";
import { MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from "@angular/core";

@Component({
  selector: "app-franchise-profile-details",
  templateUrl: "./franchise-profile-details.component.html",
  styleUrls: ["./franchise-profile-details.component.css"],
})

export class FranchiseProfileDetailsComponent implements OnInit {
  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  ngOnInit() {}
}
