import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { VerifyPartnerComponent } from '../dialog/verify-partner/verify-partner.component';
import { BlockMiningPartnerComponent } from '../dialog/block-mining-partner/block-mining-partner.component';

interface Partner {
  P_userid: string,
  p_name: string,
  p_lname: string,
  p_phone: string,
  p_email: string,
  p_gender: string,
  p_refferal_id: string,
  p_reffered_id: string,
  p_state:string,
  p_dob:Date,
  p_dop:string,
  p_liquidity:Number,
  p_add:string,
  p_aadhar:Number,
  actions: string,
}

@Component({
  selector: 'app-partner-history',
  templateUrl: './partner-history.component.html',
  styleUrls: ['./partner-history.component.css']
})
export class PartnerHistoryComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['p_userid', 'p_name', 'p_lname', 'p_email', 'p_phone', 'p_dob',
    'p_refferal_id','p_reffered_id','p_state', 'actions'];
  dataSource: MatTableDataSource<Partner>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToFetchAllPartner();
    this.dataSource.paginator = this.paginator;
  }

  callApiToFetchAllPartner() {
    this.userService.adminFetchAllMiningPartner().subscribe({
      next: (res: any) => {
          console.log(res)
         this.dataSource.data = res.miningPartnerData
        //  console.log(this.dataSource.data)
      },
      error: (err) => {
        console.log(err.message)
      }
    })
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
          this.callApiToFetchAllPartner();
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

  // -----------------

  openIsBlockPartnerDialog(miningPartnerData: any) {
    console.log(miningPartnerData)

    let config: MatDialogConfig = {
      height: '26%',
      width: '26%',
      panelClass: 'myStateDialogClass',
      data: miningPartnerData
    };
    const dialogRef = this.dialog.open(BlockMiningPartnerComponent, config);
    dialogRef.componentInstance.okClicked.subscribe(() => {
      console.log("clicked")
      let data = {
        "isBlocked": !miningPartnerData.isBlocked,
        "p_userid": miningPartnerData.p_userid
      }
      this.userService.adminBlockUnblockPartner(data).subscribe({
        next: (res: any) => {
          console.log(res)
          this.callApiToFetchAllPartner();
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

}
