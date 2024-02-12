import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
interface PendingPartners {
  p_userid: string,
  p_name:string,
  p_lanme:string,
  p_reffered_id:string,
  p_liquidity:Number,
  p_phone:Number
}

@Component({
  selector: 'app-pending-partners',
  templateUrl: './pending-partners.component.html',
  styleUrls: ['./pending-partners.component.css']
})
export class PendingPartnersComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['serialNumber', 'p_userid', 'p_name','p_reffered_id', 'p_liquidity','p_phone'];
  dataSource: MatTableDataSource<PendingPartners>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router:Router,
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToFetchPendingPartners();
    this.dataSource.paginator = this.paginator;
  }

  callApiToFetchPendingPartners() {
    this.userService.pendingPayemntPartnerList().subscribe({
      next: (res: any) => {
         console.log(res)
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
  addSerialNumbers(data: PendingPartners[]): PendingPartners[] {
    return data.map((item, index) => ({ ...item, serialNumber: index + 1 }));
  }

  goBack(){
    this.router.navigate(['/dashboard/home'])
  }

}
