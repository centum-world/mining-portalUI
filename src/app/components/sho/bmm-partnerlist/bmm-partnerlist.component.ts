import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PartnerViewComponent } from '../../admin/dialog/partner-view/partner-view.component';
import { VerifyPartnerComponent } from '../../admin/dialog/verify-partner/verify-partner.component';

interface Partner {
  fname: string;
  lname: string;
  businessDeveloperId: string;
  email: string;
  phone: string;
  state: string;
  liquidity:string;
  referralId: string;
  referredId: string;
  verify: string;
  actions: string
}
@Component({
  selector: 'app-bmm-partnerlist',
  templateUrl: './bmm-partnerlist.component.html',
  styleUrls: ['./bmm-partnerlist.component.css']
})
export class BmmPartnerlistComponent implements OnInit {
  isBlock:boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['businessDeveloperId', 'fname', 'lname', 'email', 'phone',
    'liquidity', 'state',
    'referralId', 'referredId', 'isVerify', 'actions'
  ];
  dataSource: MatTableDataSource<Partner>;
  constructor(private router: Router, private userService: UserService,
     private dialog: MatDialog,
     private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToAllPartner();
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  callApiToAllPartner() {
    let data = {
      referralId: localStorage.getItem('stateRefferalId')
    }
    this.userService.callApiToPartnerDetails(data).subscribe({
      next: (res: any) => {
        console.log(res.partners)
        this.dataSource.data = res.partners
      },
      error: (err => {
        console.log(err.error.message)
      })
    })
  }

  openViewBDDialog(partner:any){
    let config: MatDialogConfig = {
      panelClass: 'myPartnerViewDialogClass',
      data: partner
    };
    const dialogRef = this.dialog.open(PartnerViewComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      console.log("Closed");
    });
  }
  openMiningPartnerVerifyDialog(miningPartnerData: any) {
    let config: MatDialogConfig = {
      panelClass: 'verifyMemberDialogClass',
      data: miningPartnerData
    };
    const dialogRef = this.dialog.open(VerifyPartnerComponent, config);
    dialogRef.componentInstance.okClicked.subscribe(() => {
      console.log("clicked")
      let data = {
        "isVerify": true,
        "p_userid": miningPartnerData.p_userid
      }
      this.userService.adminVerifyPartner(data).subscribe({
        next: (res: any) => {
          console.log(res)
          this.callApiToAllPartner();
          this.toastr.success(res.message)
        },
        error: (err) => {
          console.log(err)
        }

      })
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log("Closed");
    });
  }

  gotoDashboard(){
    this.router.navigate(['/statedashboard/home']);
  }

}
