import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PartnerPayoutDetailsComponent } from '../modal/partner-payout-details/partner-payout-details.component';

interface MemberMyTeam {
  p_userid: string,
  name: string,
  joinDate:Date,
  action:string
}

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {

  partner_userid: '';
  indexOfLastPayment: any;
  lastPayOutAmount: any;
  lastPayOutMonth: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['serialNumber', 'p_userid', 'name','joinDate','action'];
  dataSource: MatTableDataSource<MemberMyTeam>;
  userid = '';

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private dialog:MatDialog
  ) {
    this.dataSource = new MatTableDataSource([]);
  }
  partnerDetails: any = {};

  ngOnInit() {
    this.callApiToMyTeam();
    this.dataSource.paginator = this.paginator;

  }
  callApiToMyTeam(){
    let data = {
      p_reffered_id:localStorage.getItem('mrefferid')
    }
    this.userService.useRefferalIdOfMemberToFetchMiningPartner(data).subscribe({
      next: (res: any) => {
         console.log(res.data)
        const dataWithSerial = this.addSerialNumbers(res.data);
        this.dataSource.data = dataWithSerial;
      },
      error: (err) => {
        console.log(err.message);
      }
    });
  }

  fetchPartnerDetails(userid:any){
    this.partnerDetails.userid = userid
    console.log(userid)
   this.partner_userid = userid
    let data = {
      p_userid: userid
    }

    this.userService.fetchPartnerDetailsFromMember(data).subscribe({
      next: (response: any) => {
        if (response) {
          console.log(response.data)
            this.partnerDetails.liquidity = response.data[0].p_liquidity
             this.partnerDetails.dop= response.data[0].p_dop
              this.partnerDetails.name= response.data[0].p_name
              this.partnerDetails.month_count= response.data[0].month_count
              this.partnerDetails.partner_count= response.data[0].partner_count
              this.partnerDetails.partner_status= response.data[0].partner_status
              // this.partnerDetails= response.data[0].p_name

        }
        //  console.log(this.memberDocuments)
        let config: MatDialogConfig = {
          panelClass:'stateProfileDocumetsDialogClass',data:this.partnerDetails
       
         };
         const dialogRef = this.dialog.open(PartnerPayoutDetailsComponent,config);
       
         dialogRef.afterClosed().subscribe(result => {
           console.log('The dialog was closed');
           // Do something with the result if needed
         });
      },
      error: error => {
       console.log(error)
      }
    })

  }

  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addSerialNumbers(data: MemberMyTeam[]): MemberMyTeam[] {
    return data.map((item, index) => ({ ...item, serialNumber: index + 1 }));
  }
}
