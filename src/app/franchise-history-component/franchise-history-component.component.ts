import { Component, OnInit } from "@angular/core";
import { UserService } from "../service/user.service";

@Component({
  selector: "app-franchise-history-component",
  templateUrl: "./franchise-history-component.component.html",
  styleUrls: ["./franchise-history-component.component.css"],
})
export class FranchiseHistoryComponentComponent implements OnInit {
  tableHeaders = [
    "franchiseId",
    "fname",
    "lname",
    "email",
    "phone",
    "gender",
    "referralId",
    "selectedState",
    "selectedCity",
  ];

  franchiseData: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getAllFranchise();
  }

  getAllFranchise() {
    this.userService.fetchAllFranchise().subscribe({
      next: (res: any) => {
        this.franchiseData = res.franchiseData;
        console.log(res.franchiseData);
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
}
