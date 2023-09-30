import { Component, OnInit } from "@angular/core";
import { UserService } from "../service/user.service";

@Component({
  selector: "app-franchise-profile-details",
  templateUrl: "./franchise-profile-details.component.html",
  styleUrls: ["./franchise-profile-details.component.css"],
})
export class FranchiseProfileDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "referralId",
    "phone",
    "email",
    "gender",
    "referredId",
  ];

  dataSource = [
    {
      name: "John Doe",
      referralId: "12345",
      phone: "123-456-7890",
      email: "john@example.com",
      gender: "Male",
      referredId: "67890",
    },
  ];



  constructor() {}

  ngOnInit() {}
}
