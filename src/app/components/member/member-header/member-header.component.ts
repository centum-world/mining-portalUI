import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { MemberProfileDetailsComponent } from '../modal/member-profile-details/member-profile-details.component';
import { MemberDocumentsDetailsComponent } from '../modal/member-documents-details/member-documents-details.component';

@Component({
  selector: 'app-member-header',
  templateUrl: './member-header.component.html',
  styleUrls: ['./member-header.component.css']
})
export class MemberHeaderComponent implements OnInit {
  isVisible: boolean = false;
  
  constructor(private userService:UserService , private dialog:MatDialog,private router:Router) { }
  memberDetails: any = {};
  memberDocuments={
    aadharFrontSide:"",
    aadharBackSide:"",
    panCard:""

  }
  ngOnInit() {
  }

  toggleSidebar() {
    this.isVisible = !this.isVisible;
  }

  closeSidebar() {
    this.isVisible = false;
  }
  
  myProfileDialog(){
    this.isVisible = false;
    let data = {
      m_userid :localStorage.getItem('userdetail')
     }
     this.userService.fetchMemberPortalDetails(data).subscribe({
      next: (response: any) => {
        if (response) {
            // console.log(response.data)
            this.memberDetails.fname= response.data[0].m_name;
            this.memberDetails.lname= response.data[0].m_lname;
            this.memberDetails.phone= response.data[0].m_phone;
            this.memberDetails.email= response.data[0].m_email;
            this.memberDetails.address= response.data[0].m_add;
            this.memberDetails.dob= response.data[0].m_dob;
            this.memberDetails.gender= response.data[0].m_gender;
            this.memberDetails.referredId= response.data[0].m_refferid;
            this.memberDetails.referralId= response.data[0].reffer_id;
            this.memberDetails.memberId= response.data[0].m_userid;
            this.memberDetails.state= response.data[0].m_state;
            this.memberDetails.designation= response.data[0].m_designation;
            // console.log(this.memberDetails.fname)
            let config:MatDialogConfig = {
            panelClass:'memberDetailsDialogClass', data:this.memberDetails
            };
            const dialogRef = this.dialog.open(MemberProfileDetailsComponent,config);
            dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
              // Do something with the result if needed
            })
        }
      },
      error: error => {
       console.log(error)
      }
    })
  }

  myDocumentsDialog(){
    this.isVisible = false;
    let data = {
      m_userid:localStorage.getItem('userdetail')
    }

    this.userService.fetchMemberPortalDetails(data).subscribe({
      next: (response: any) => {
        if (response) {
          console.log(response.data)
           this.memberDocuments.aadharFrontSide = response.data[0].adhar_front_side,
           this.memberDocuments.aadharBackSide= response.data[0].adhar_back_side,
           this.memberDocuments.panCard = response.data[0].panCard

        }
         console.log(this.memberDocuments)
        let config: MatDialogConfig = {
          panelClass:'memberProfileDocumetsDialogClass',data:this.memberDocuments
       
         };
         const dialogRef = this.dialog.open(MemberDocumentsDetailsComponent,config);
       
         dialogRef.afterClosed().subscribe(result => {
           console.log('The dialog was closed');
           // Do something with the result if needed
         });
      },
      error: error => {
       console.log(error)
      }
    })

    // console.log(this.memberDocuments)
 
  }

  withdrawal(){
    this.router.navigate(['/memberdashboard/withdrawal-request']);
    this.isVisible = false;
  }


  myTeam(){
    this.router.navigate(['/memberdashboard/my-team']);
    this.isVisible = false;
  }
  
  partnerList(){
    this.router.navigate(['/memberdashboard/partner-list']);
    this.isVisible = false;
  }

  referralPayout(){
    this.router.navigate(['/memberdashboard/referral-payout']);
    this.isVisible = false;
  }

  dashboard(){
    this.router.navigate(['/memberdashboard']);
  }

  promotion(){
    this.router.navigate(['/memberdashboard/promotion']);
  }

 
  
  logOut(){
    localStorage.clear();
    this.router.navigate(['/memberlogin'])
  
  }

  

}
