import { Component, OnInit, Inject } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-member-profile-details",
  templateUrl: "./member-profile-details.component.html",
  styleUrls: ["./member-profile-details.component.css"],
})
export class MemberProfileDetailsComponent implements OnInit {
  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
}
