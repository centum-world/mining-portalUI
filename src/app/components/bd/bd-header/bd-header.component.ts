import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";

import { BdProfileDetailsComponent } from "../bd-profile-details/bd-profile-details.component";

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

  bdDetails: any = {};

  ngOnInit() {}

  logOut() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  refresh() {
    this.router.navigate(['/bd-dashboard/home']);
  }

  listBusinessDeveloper() {
    // Implement your logic here
  }

  handleWithdrawalClick() {
    this.router.navigate(['/bd-dashboard/withdrawal-list']);
  }

  openBusinessDevDetailsDialog() {
    let data = {
      businessDeveloperId: localStorage.getItem('bdHandlerID')
    };

    this.userService.fetchParticularBdDetails(data).subscribe({
      next: (response: any) => {
        if (response) {
          console.log(response.bdDetails)

          this.bdDetails.fname = response.bdDetails.fname;
          this.bdDetails.lname = response.bdDetails.lname;
          this.bdDetails.phone = response.bdDetails.phone;
          this.bdDetails.gender = response.bdDetails.gender;
          this.bdDetails.email = response.bdDetails.email;
          this.bdDetails.businessDeveloperId = response.bdDetails.businessDeveloperId;
          this.bdDetails.referralId = response.bdDetails.referralId;
          this.bdDetails.referredId = response.bdDetails.referredId;
          this.bdDetails.state = response.bdDetails.state;
          this.bdDetails.businessCity = response.bdDetails.businessCity;

          let config: MatDialogConfig = {
            panelClass: 'franchiseProfileDetailsDialogClass',
            data: this.bdDetails
          };
          const dialogRef = this.dialog.open(BdProfileDetailsComponent, config);

          dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
            // Do something with the result if needed
          });
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  openFranchiseDocumentsDialog() {
    // Implement your logic here
  }
}
