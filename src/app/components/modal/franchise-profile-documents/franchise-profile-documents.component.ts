import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from "@angular/core";

@Component({
  selector: "app-franchise-profile-documents",
  templateUrl: "./franchise-profile-documents.component.html",
  styleUrls: ["./franchise-profile-documents.component.css"],
})
export class FranchiseProfileDocumentsComponent implements OnInit {
  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
}
