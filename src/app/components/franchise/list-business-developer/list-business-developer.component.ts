import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BdViewComponent } from '../dialog/bd-view/bd-view.component';
import { BdVerifyComponent } from '../dialog/bd-verify/bd-verify.component';
import { BdBlockComponent } from '../dialog/bd-block/bd-block.component';
import { BdEditComponent } from '../dialog/bd-edit/bd-edit.component';


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
  isBlock:boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['businessDeveloperId', 'fname', 'lname', 'email', 'phone', 'gender',
    'businessCity', 'state',
    'referralId', 'referredId', 'isVerify', 'actions'
  ];
  dataSource: MatTableDataSource<Bd>;
  constructor(private router: Router, private userService: UserService,
     private dialog: MatDialog,
     private toastr: ToastrService) {
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
    let config: MatDialogConfig = {
      panelClass: 'myBdVieewDialogClass',
      data: data
    };
    const dialogRef = this.dialog.open(BdViewComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log("Closed");
    });
  }
  openVerifyDialog(data:any){
    let config: MatDialogConfig = {
      panelClass: 'myBdVerifyDialogClass',
      data: data
    };
    const dialogRef = this.dialog.open(BdVerifyComponent, config);
    dialogRef.componentInstance.okClicked.subscribe(() => {
      let data1 = {
        businessDeveloperId : data.businessDeveloperId
      }
      this.userService.bdVerify(data1).subscribe({
        next:(res:any)=>{
          this.toastr.success(res.message)
          this.callApiToAllFranchise();
        },
        error:(error=>{
          this.toastr.warning(error.error.message)
        })
      })
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log("Closed");
    });
  }

  openIsBlockDialog(data:any){
    let config: MatDialogConfig = {
      panelClass: 'myBdVerifyDialogClass',
      data: data
    };
    const dialogRef = this.dialog.open(BdBlockComponent, config);
    dialogRef.componentInstance.okClicked.subscribe(() => {
      console.log(data)
      this.isBlock = data.isBlocked
      let data1 = {
        isBlocked : !this.isBlock,
         businessDeveloperId : data.businessDeveloperId
      }
      this.userService.bdBlockOrUnblock(data1).subscribe({
        next:(res:any)=>{
          this.toastr.success(res.message)
          this.callApiToAllFranchise();
        },
        error:(err=>{
          console.log(err.error.message)
        })
      })
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log("Closed");
    });
  }
  openEditBDDialog(data:any){
    let config: MatDialogConfig = {
      panelClass: 'myBdEditDialogClass',
      data: data
    };
    const dialogRef = this.dialog.open(BdEditComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      this.callApiToAllFranchise();
    });
  }
}