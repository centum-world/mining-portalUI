import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";

import { BdProfileDetailsComponent } from "../bd-profile-details/bd-profile-details.component";

import { UserService } from "src/app/service/user.service";
import { BdProfileDocumentsComponent } from "../bd-profile-documents/bd-profile-documents.component";

@Component({
  selector: "app-bd-header",
  templateUrl: "./bd-header.component.html",
  styleUrls: ["./bd-header.component.css"],
})
export class BdHeaderComponent implements OnInit {
  isVisible: boolean = false;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) {}

  bdDetails: any = {};
  bdDocuments: any = {}

  ngOnInit() {}

  toggleSidebar() {
    this.isVisible = !this.isVisible;
  }
  closeSidebar() {
    this.isVisible = false;
  }
  

  logOut() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  refresh() {
    this.router.navigate(['/bd-dashboard/home']);
    this.isVisible = false;
  }

  listMember() {
    // Implement your logic here\
    this.router.navigate(['/bd-dashboard/member-list'])
    this.isVisible = false;
  }

  addMember(){
    this.router.navigate(['/bd-dashboard/add-member'])

  }

  handleWithdrawalClick() {
    this.router.navigate(['/bd-dashboard/withdrawal-list']);
    this.isVisible = false;
  }

  partnerMyTeam(){
    this.router.navigate(['/bd-dashboard/businessDev-partner-team'])
    this.isVisible = false
  }

  openBusinessDevDetailsDialog() {
    this.isVisible = false;
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

  openBdDocumentsDialog() {
    this.isVisible = false;
    let data = {
      businessDeveloperId:localStorage.getItem('bdHandlerID')
    }

    this.userService.fetchParticularBdDetails(data).subscribe({
      next: (response: any) => {
        if (response) {
          console.log(response)
          this.bdDocuments.aadharFrontSide = response.bdDetails
        .adhar_back_side          ,
          this.bdDocuments.aadharBackSide= response.bdDetails.adhar_back_side,
          this.bdDocuments.panCard = response.bdDetails.panCard

        }
      },
      error: error => {
       console.log(error)
      }
    })


    let config: MatDialogConfig = {
       panelClass:'franchiseDocumentsDialogClass',data:this.bdDocuments
    };
    const dialogRef = this.dialog.open(BdProfileDocumentsComponent,config);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Do something with the result if needed
    });
  }

  listBussinessDeveloper(){
    
  }

}
