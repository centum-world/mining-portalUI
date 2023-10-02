import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router'
import { FranchiseProfileDetailsComponent } from '../franchise-profile-details/franchise-profile-details.component';
import { UserService } from '../service/user.service';
import { FranchiseProfileDocumentsComponent } from '../components/modal/franchise-profile-documents/franchise-profile-documents.component';

@Component({
  selector: "app-franchise-header",
  templateUrl: "./franchise-header.component.html",
  styleUrls: ["./franchise-header.component.css"],
})
export class FranchiseHeaderComponent implements OnInit {
  constructor(private dialog: MatDialog, private router  : Router,private userService:UserService) { }

  franchiseDetails={
    fname:"",
    lname:"",
    phone:"",
    gender:"",
    email:"",
    referredId:"",
    referralId:"",
    franchiseId:"",
    state:[],
    city:[]
  }

  // 
  franchiseDocuments = {
    aadharFrontSide :"",
     aadharBackSide:"",
     panCard:""
  }

  ngOnInit() {}

  
  openDialog() {

    let data = {
      franchiseId:localStorage.getItem('franchiseId')
    }

    this.userService.fetchParticularFranchiseDetails(data).subscribe({
      next: (response: any) => {
        if (response) {
          console.log(response)
          this.franchiseDetails.fname = response.franchise.fname,
          this.franchiseDetails.lname= response.franchise.lname,
          this.franchiseDetails.phone = response.franchise.phone,
          this.franchiseDetails.gender = response.franchise.gender,
          this.franchiseDetails.email = response.franchise.email,
          this.franchiseDetails.franchiseId = response.franchise.franchiseId,
          this.franchiseDetails.referralId = response.franchise.referralId,
          this.franchiseDetails.referredId = response.franchise.referredId,
          this.franchiseDetails.state = response.franchise.franchiseState,
          this.franchiseDetails.city = response.franchise.franchiseCity

        }
      },
      error: error => {
       console.log(error)
      }
    })


    let config: MatDialogConfig = {
      height:'70%', width:'60%', panelClass:'myStateDialogClass',data:this.franchiseDetails
    };
    const dialogRef = this.dialog.open(FranchiseProfileDetailsComponent,config);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Do something with the result if needed
    });
  }

  openFranchiseDocumentsDialog() {

    let data = {
      franchiseId:localStorage.getItem('franchiseId')
    }

    this.userService.fetchParticularFranchiseDetails(data).subscribe({
      next: (response: any) => {
        if (response) {
          console.log(response)
          this.franchiseDocuments.aadharFrontSide = response.franchise.adhar_back_side          ,
          this.franchiseDocuments.aadharBackSide= response.franchise.adhar_back_side,
          this.franchiseDocuments.panCard = response.franchise.panCard

        }
      },
      error: error => {
       console.log(error)
      }
    })


    let config: MatDialogConfig = {
      height:'70%', width:'60%', panelClass:'myStateDialogClass',data:this.franchiseDocuments
    };
    const dialogRef = this.dialog.open(FranchiseProfileDocumentsComponent,config);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Do something with the result if needed
    });
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/franchiselogin']);
  }

}
