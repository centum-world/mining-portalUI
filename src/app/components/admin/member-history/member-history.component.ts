import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { ViewMemberComponent } from '../dialog/view-member/view-member.component';
import { VerifyMemberComponent } from '../dialog/verify-member/verify-member.component';
import { BlockMemberComponent } from '../dialog/block-member/block-member.component';
import { EditMemberComponent } from '../dialog/edit-member/edit-member.component';
import { Router } from '@angular/router';

interface Member {
  m_userid: string,
  m_name: string,
  m_lname: string,
  m_phone: string,
  m_email: string,
  m_gender: string,
  m_refferid: string,
  reffer_id: string,
  m_state:string,
  actions: string,
}

@Component({
  selector: 'app-member-history',
  templateUrl: './member-history.component.html',
  styleUrls: ['./member-history.component.css']
})
export class MemberHistoryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['m_userid', 'm_name', 'm_lname', 'm_email', 'm_phone', 'm_gender',
    'm_refferid','reffer_id','m_state', 'actions'];

    downgradeColumns: string[] = ['m_userid', 'm_name', 'm_lname', 'm_email', 'm_phone', 'm_gender',
    'm_refferid','reffer_id','m_state'];
  dataSource: MatTableDataSource<Member>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router:Router,
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.tabChanged(0);
    // this.callApiToFetchAllMember();
    this.dataSource.paginator = this.paginator;
  }

  tabChanged(event : any){
    if(event === 0){
      this.userService.CallApifetchVerifiedMember().subscribe({
        next: (res: any) => {
          // console.log(res.memberData)
           this.dataSource.data = res.data
          //  console.log(this.dataSource.data)
        },
        error: (err) => {
          console.log(err.message)
        }
      })
    }else if(event === 1 ){
      this.userService.CallApifetchUnVerifiedMember().subscribe({
        next:(res: any) => {
          console.log(res)
          this.dataSource.data = res.data
        },
        error: (err) => {
          console.log('error')
        }
      })
    }else if(event === 2){
      this.userService.CallApifetchUpgradedMember().subscribe({
        next:(res: any) => {
          console.log(res)
          this.dataSource.data = res.data
        },
        error: (err) => {
          console.log('error')
        }
      })
    }
  }

  callApiToFetchAllMember() {
    this.userService.fetchMemberDetails().subscribe({
      next: (res: any) => {
        // console.log(res.memberData)
         this.dataSource.data = res.memberData
        //  console.log(this.dataSource.data)
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openViewMemberDialog(memberData:any){
    let config: MatDialogConfig = {
      panelClass: 'myMemberViewDialogClass',
      data: memberData
    };
    const dialogRef = this.dialog.open(ViewMemberComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      console.log("Closed");
    });
  }

  openMemberVerifyDialog(memberData: any) {
    let config: MatDialogConfig = {
      panelClass: 'verifyMemberDialogClass',
      data: memberData
    };
    const dialogRef = this.dialog.open(VerifyMemberComponent, config);
    dialogRef.componentInstance.okClicked.subscribe(() => {
      console.log("clicked")
      let data = {
        "isVerify": true,
        "m_userid": memberData.m_userid
      }
      this.userService.adminVerifyMember(data).subscribe({
        next: (res: any) => {
          console.log(res)
          this.callApiToFetchAllMember();
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

  openIsBlockMemberDialog(memberData: any) {
    console.log(memberData)

    let config: MatDialogConfig = {
      panelClass: 'myMemberBLockStateDialogClass',
      data: memberData
    };
    const dialogRef = this.dialog.open(BlockMemberComponent, config);
    dialogRef.componentInstance.okClicked.subscribe(() => {
      console.log("clicked")
      let data = {
        "isBlocked": !memberData.isBlocked,
        "m_userid": memberData.m_userid
      }
      this.userService.adminBlockOrUnblockMember(data).subscribe({
        next: (res: any) => {
          console.log(res)
          this.callApiToFetchAllMember();
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

  openMemberEditDialog(memberData:any){
    let config: MatDialogConfig = {
      panelClass: 'myStateEditDialogClass',
      data: memberData
    };
    const dialogRef = this.dialog.open(EditMemberComponent, config);

    dialogRef.afterClosed().subscribe(result=>{
      this.callApiToFetchAllMember();
      console.log("closed")
    })
  } 
  
  gotoMemberAccountSection(memberData:any){
    console.log(memberData.m_userid)
    this.router.navigate(["dashboard/member-account", memberData.m_userid]);
  }

  goBack(){
    this.router.navigate(['/dashboard/home'])
  }

}
