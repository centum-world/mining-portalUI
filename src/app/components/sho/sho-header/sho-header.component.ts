import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StateProfileModalComponent } from '../../modal/state-profile-modal/state-profile-modal.component';
import { MatDialogConfig } from '@angular/material/dialog';
import { StateProfileDocumentsComponent } from '../../modal/state-profile-documents/state-profile-documents.component';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sho-header',
  templateUrl: './sho-header.component.html',
  styleUrls: ['./sho-header.component.css']
})
export class ShoHeaderComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private userService:UserService,
    private router : Router
    ) { }

  shoDocuments={
    aadharFrontSide:"",
    aadharBackSide:"",
    panCard:""

  }
  ngOnInit() {
  }


  openDialog() {
    let config: MatDialogConfig = {
     panelClass:'myStateDialogClass'
    };
    const dialogRef = this.dialog.open(StateProfileModalComponent,config);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Do something with the result if needed
    });
  }

  openStateDocumentsDialog() {

      let data = {
        stateHandlerId:localStorage.getItem('stateHandlerId')
      }
  
      this.userService.shoDetails(data).subscribe({
        next: (response: any) => {
          if (response) {
            console.log(response)
            this.shoDocuments.aadharFrontSide = response.sho.adhar_front_side,
            this.shoDocuments.aadharBackSide= response.sho.adhar_back_side,
            this.shoDocuments.panCard = response.sho.panCard
  
          }
        },
        error: error => {
         console.log(error)
        }
      })

      console.log(this.shoDocuments)
    let config: MatDialogConfig = {
     panelClass:'stateProfileDocumetsDialogClass',data:this.shoDocuments

    };
    const dialogRef = this.dialog.open(StateProfileDocumentsComponent,config);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Do something with the result if needed
    });
  }

  addFranchise(){
    this.router.navigate(['/statedashboard/add-franchise'])
  }
  franchiseList(){
    this.router.navigate(['/statedashboard/franchise-list'])
  }
  handleWithdrawalClick(){
    this.router.navigate(['/statedashboard/withdrawal-list'])
  }
  dashboard(){
    this.router.navigate(['/statedashboard'])
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/statelogin']);
  }
}
