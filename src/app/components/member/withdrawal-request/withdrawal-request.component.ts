import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { WithdrawDialogComponent } from '../../sho/diolog/withdraw-dialog/withdraw-dialog.component';

interface MemberWithdrawalRequest {
  m_userid: string,
  member_wallet: number,
  reffer_p_userid: string,
  request_date:Date,
}

@Component({
  selector: 'app-withdrawal-request',
  templateUrl: './withdrawal-request.component.html',
  styleUrls: ['./withdrawal-request.component.css']
})
export class WithdrawalRequestComponent implements OnInit {

  partnerRequestHistory = [];
  requestHistroy = [];
  approvedHistory = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['serialNumber', 'm_userid', 'member_wallet','serviceCharge', 'paybleAmount','refferal','request_date'];
  dataSource: MatTableDataSource<MemberWithdrawalRequest>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router:Router,
    private dialog:MatDialog, 
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToFetchMemberWithdrawalRequest();
    this.dataSource.paginator = this.paginator;
    this.tabChanged(0)
  }

  callApiToFetchMemberWithdrawalRequest() {
    let data = {
      m_userid:localStorage.getItem('userdetail')
    }
    this.userService.memberWithdrawalRequstInMemberPortal(data).subscribe({
      next: (res: any) => {
         console.log(res)
         this.partnerRequestHistory = res.data
        const dataWithSerial = this.addSerialNumbers(res.data);
        this.dataSource.data = dataWithSerial;
      },
      error: (err) => {
        console.log(err.message);
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addSerialNumbers(data: MemberWithdrawalRequest[]): MemberWithdrawalRequest[] {
    return data.map((item, index) => ({ ...item, serialNumber: index + 1 }));
  }

  goBack(){
    this.router.navigate(['/memberdashboard/home'])
  }

  openWithdrawalRequest(){
    let config: MatDialogConfig = {
      panelClass: 'memberWithdrawDialogClass',
    };
    const dialogRef = this.dialog.open(WithdrawDialogComponent, config);
  }

  tabChanged(tab:any){
    if(tab === 0){
      let data = {
        memberId:localStorage.getItem('userdetail')
      }
      this.userService.paymentRequestForMember(data).subscribe({
        next:(res:any)=>{
          console.log(res.data)
          this.requestHistroy = res.data

        },
        error:(error)=>{
          console.log(error.error.message)
        }
      })
    }else if(tab === 1){
      let data = {
        memberId:localStorage.getItem('userdetail')
      }
      this.userService.paymentApprovedForMember(data).subscribe({
        next:(res:any)=>{
          console.log(res.memberWithdrawalHistory)
          this.approvedHistory = res.memberWithdrawalHistory
        },
        error:(error)=>{
          console.log(error.error.message)
        }

      })
    }
  }
}
