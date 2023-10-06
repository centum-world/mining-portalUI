import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

interface ActivePartner {
  p_userid: string,
  p_name: string,
  p_lname: string,
  p_phone: string,
  p_reffered_id: string,
  p_refferal_id: string,
  p_liquidity:Number,
  p_dop:Date,
  partner_status:Boolean,
  month_count:Number,
  status:string
}

@Component({
  selector: 'app-active-partners-history',
  templateUrl: './active-partners-history.component.html',
  styleUrls: ['./active-partners-history.component.css']
})
export class ActivePartnersHistoryComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['p_userid', 'p_name', 'p_lname','p_phone', 'p_reffered_id',  'p_liquidity',
    'p_dop','status'];
  dataSource: MatTableDataSource<ActivePartner>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToFetchAllActivePartner();
    this.dataSource.paginator = this.paginator;
  }

  callApiToFetchAllActivePartner() {
    this.userService.activePartnerApi().subscribe({
      next: (res: any) => {
         console.log(res.data)
          this.dataSource.data = res.data
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

}
