import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr'

interface PartnerMyTeam {
  p_userid: string,
  name: string,
  joinDate:Date,
  p_liquidity:Number

}

@Component({
  selector: 'app-state-partner-my-team',
  templateUrl: './state-partner-my-team.component.html',
  styleUrls: ['./state-partner-my-team.component.css']
})
export class StatePartnerMyTeamComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['serialNumber', 'p_userid', 'name','joinDate','p_liquidity'];
  dataSource: MatTableDataSource<PartnerMyTeam>;
  userid = '';

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
  ) {
    this.dataSource = new MatTableDataSource([]);
  }
  ngOnInit() {
    this.callApiToMyTeam();
    this.dataSource.paginator = this.paginator;
  }

  callApiToMyTeam(){
    let data = {
      referralId:localStorage.getItem('stateRefferalId')
    }
    this.userService.statePartnerMyTeam(data).subscribe({
      next: (res: any) => {
         console.log(res.partnerDetails)
        const dataWithSerial = this.addSerialNumbers(res.partnerDetails);
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

  addSerialNumbers(data: PartnerMyTeam[]): PartnerMyTeam[] {
    return data.map((item, index) => ({ ...item, serialNumber: index + 1 }));
  }

}
