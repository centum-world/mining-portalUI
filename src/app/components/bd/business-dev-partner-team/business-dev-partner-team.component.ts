import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

interface Partner {
  p_name: string,
  p_lame: string,
  p_userid: string,
  p_liquidity: string,
  p_reffered_id: string,
  p_refferal_id: string,

}

@Component({
  selector: 'app-business-dev-partner-team',
  templateUrl: './business-dev-partner-team.component.html',
  styleUrls: ['./business-dev-partner-team.component.css']
})
export class BusinessDevPartnerTeamComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['p_userid', 'p_name', 'p_lname',
    'p_liquidity','p_reffered_id','p_refferal_id'];
  dataSource: MatTableDataSource<Partner>;

  constructor( private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router:Router,) {
       this.dataSource = new MatTableDataSource([]);
      }

  ngOnInit() {
    this.callApiToFetchBusinessPartnerTeam()
    this.dataSource.paginator = this.paginator;
  }
  callApiToFetchBusinessPartnerTeam() {

    let data = {
      referralId:localStorage.getItem('bdRefferalId')
    }
    this.userService.fetchBusinessDevPartnerTeam(data).subscribe({
      next: (res: any) => {
        console.log(res.partnerDetails)
        this.dataSource.data = res.partnerDetails
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

  goBack(){
    this.router.navigate(['/bd-dashboard/home'])
  }
}
