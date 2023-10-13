import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";

import { BdProfileDetailsComponent } from "../bd-profile-details/bd-profile-details/bd-profile-details.component";

import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-bd-header",
  templateUrl: "./bd-header.component.html",
  styleUrls: ["./bd-header.component.css"],
})
export class BdHeaderComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) {}

  bdDetails = {
    fname: "",
    lname: "",
    phone: "",
    gender: "",
    email: "",
    referredId: "",
    referralId: "",
    businessDeveloperId: "",
    state: [],
    businessCity: [],
  };

  ngOnInit() {}

  logOut() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }
  refresh(){
    this.router.navigate(['/bd-dashboard/home']);
  }
  listBussinessDeveloper(){

  }
  handleWithdrawalClick(){
    this.router.navigate(['/bd-dashboard/withdrawal-list'])
  }
  openDialog(){

  }
  openFranchiseDocumentsDialog(){
    
  }
}
