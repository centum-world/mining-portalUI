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
    this.router.navigate(["/statelogin"]);
  }
  refresh() {}
  listBussinessDeveloper() {}
  handleWithdrawalClick() {
    this.router.navigate(["/bd-dashboard/withdrawal-list"]);
  }
  // openDialog() {
  //   let data = {
  //     businessDeveloperId: localStorage.getItem("bdHandlerId"),
  //   };

  //   this.userService.fetchParticularBdDetails(data).subscribe({
  //     next: (response: any) => {
  //       if (response) {
  //         console.log(response, "response 55");
  //       }
  //     },

  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });

  //   let config: MatDialogConfig = {
  //     panelClass: "franchiseProfileDetailsDialogClass",
  //     data: this.bdDetails,
  //   };
  //   const dialogRef = this.dialog.open(BdProfileDetailsComponent, config);

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log("The dialog was closed");
  //   });
  // }

  openBusinessDevDetailsDialog() {

    let data = {
      businessDeveloperId:localStorage.getItem('bdHandlerID')
    }

    this.userService.fetchParticularBdDetails(data).subscribe({
      next: (response: any) => {
        if (response) {
          console.log(response)
          // this.franchiseDetails.fname = response.franchise.fname,
          // this.franchiseDetails.lname= response.franchise.lname,
          // this.franchiseDetails.phone = response.franchise.phone,
          // this.franchiseDetails.gender = response.franchise.gender,
          // this.franchiseDetails.email = response.franchise.email,
          // this.franchiseDetails.franchiseId = response.franchise.franchiseId,
          // this.franchiseDetails.referralId = response.franchise.referralId,
          // this.franchiseDetails.referredId = response.franchise.referredId,
          // this.franchiseDetails.state = response.franchise.franchiseState,
          // this.franchiseDetails.city = response.franchise.franchiseCity

        }
      },
      error: error => {
       console.log(error.message)
      }
    })


    let config: MatDialogConfig = {
       panelClass:'franchiseProfileDetailsDialogClass',data:this.bdDetails
    };
    const dialogRef = this.dialog.open(BdProfileDetailsComponent,config);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Do something with the result if needed
    });

    
  }
  openFranchiseDocumentsDialog() {}
}
