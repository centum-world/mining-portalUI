import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


interface Bd {
  fname: string;
  lname: string;
  businessDeveloperId: string;
  email: string;
  phone: string;
  gender: string;
  businessCity: string;
  state: string;
  referralId: string;
  referredId: string;
  verify: string;
  actions: string
}

@Component({
  selector: 'app-list-business-developer',
  templateUrl: './list-business-developer.component.html',
  styleUrls: ['./list-business-developer.component.css']
})
export class ListBusinessDeveloperComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['businessDeveloperId', 'fname', 'lname', 'email', 'phone', 'gender',
    'businessCity', 'state',
    'referralId', 'referredId', 'isVerify', 'actions'
  ];
  dataSource: MatTableDataSource<Bd>;
  constructor(private router: Router, private userService: UserService) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToAllFranchise();
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  callApiToAllFranchise() {
    let data = {
      referralId: localStorage.getItem('franchiseReferralId')
    }
    this.userService.callApiToBdDetails(data).subscribe({
      next: (res: any) => {
        console.log(res.results)
        this.dataSource.data = res.results
      },
      error: (err => {
        console.log(err.error.message)
      })
    })
  }

  createbd() {
    this.router.navigate(['/franchisedashboard/add-bd']);
  }


  openViewBDDialog(data:any){

  }
  openVerifyDialog(data:any){

  }

  openIsBlockDialog(data:any){

  }
  openEditBDDialog(data:any){

  }
  gotoBdAccount(){
    
  }
}
