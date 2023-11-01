import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatDialogConfig } from '@angular/material';
import { UserService } from 'src/app/service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { PartnerViewComponent } from '../../admin/dialog/partner-view/partner-view.component';


interface Partner {
  p_userid: string;
  p_name:string;
  p_lname:string;
  p_email:string;
  p_phone:string;
  p_address:string;
  p_liquidity:string;
  p_refferal_id:string;
  p_reffered_id:string;
  isBlocked:string;
  isVerify:string;
  actions:string
}
@Component({
  selector: 'app-mining-details',
  templateUrl: './mining-details.component.html',
  styleUrls: ['./mining-details.component.css']
})
export class MiningDetailsComponent implements OnInit {

  displayedColumns: string[] = ['p_userid','p_name','p_lname','p_email',
  'p_phone','p_address','p_liquidity','p_refferal_id','p_reffered_id',
  'isBlocked', 'isVerify','actions'
];

  dataSource: MatTableDataSource<Partner>;
  constructor(private router:Router,private dialog: MatDialog,private userService:UserService) { 
    this.dataSource = new MatTableDataSource([]);
  }
  
  ngOnInit() {
    this.fetchMiningPartnerProfileDetails();
  }

  fetchMiningPartnerProfileDetails(){
    let partnerIdDetails = localStorage.getItem('partnerdetails');
    let data = {
      p_userid: partnerIdDetails
    }
    this.userService.fetchMiningPartnerProfileDetails(data).subscribe({
      next:(res:any)=>{
        console.log(res.data)
        this.dataSource.data = res.data
      },
      error:(err=>{
        console.log(err.error.message)
      })
    })
  }

  gotoHome(){
    this.router.navigate(['/miningdashboard/home'])
  }
  gotoAccountsection(){
    this.router.navigate(['/miningdashboard/account']);
  }

  openViewPartnerDialog(partner:any){
    let config: MatDialogConfig = {
      panelClass: 'myPartnerViewDialogClass',
      data: partner
    };
    console.log(partner)
    const dialogRef = this.dialog.open(PartnerViewComponent,config);

    dialogRef.afterClosed().subscribe(result => {
      console.log("Closed");
    });
  }

  downLoadPartnershipBond(){
    this.userService.fetchPartnerBond().subscribe({
      next:(res:any)=>{
       console.log(res.data[0].bond);
      const bondData = res.data[0].bond;
      const pdfUrl = bondData;

      // Open the PDF link in a new tab
      window.open(pdfUrl, '_blank');
      },
      error:(err=>{
        console.log(err.error.message)
      })
    })
  }
}
