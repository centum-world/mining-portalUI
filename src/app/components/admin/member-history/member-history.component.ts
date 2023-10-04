import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { ViewMemberComponent } from '../dialog/view-member/view-member.component';

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
  dataSource: MatTableDataSource<Member>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToFetchAllMember();
    this.dataSource.paginator = this.paginator;
  }

  callApiToFetchAllMember() {
    this.userService.fetchMemberDetails().subscribe({
      next: (res: any) => {
        console.log(res.data)
         this.dataSource.data = res.data
         console.log(this.dataSource.data)
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openViewMemberDialog(data:any){
    let config: MatDialogConfig = {
      panelClass: 'myStateDialogClass',
      data: data
    };
    const dialogRef = this.dialog.open(ViewMemberComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      console.log("Closed");
    });
  }

}
