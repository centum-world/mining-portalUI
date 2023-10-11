import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { BdViewComponent } from '../../franchise/dialog/bd-view/bd-view.component';
import { BdVerifyComponent } from '../../franchise/dialog/bd-verify/bd-verify.component';
import { BdBlockComponent } from '../../franchise/dialog/bd-block/bd-block.component';
import { BdEditComponent } from '../../franchise/dialog/bd-edit/bd-edit.component';
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
  selector: 'app-bd-list',
  templateUrl: './bd-list.component.html',
  styleUrls: ['./bd-list.component.css']
})
export class BdListComponent implements OnInit {
  isBlock:boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['businessDeveloperId', 'fname', 'lname', 'email', 'phone', 'gender',
    'businessCity', 'state',
    'referralId', 'referredId', 'isVerify', 'actions'
  ];


  dataSource: MatTableDataSource<Bd>;
  constructor(private userService : UserService, private dialog: MatDialog, private toastr:ToastrService, private router: Router) { 

    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToBDList();
  }

  callApiToBDList(){
    this.userService.bdListAdminSide().subscribe({
      next:(res:any)=>{
        console.log(res.results)
        this.dataSource.data = res.results
      },
      error:(error=>{
        console.log(error.error.message)
      })
    })
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
          this.callApiToBDList();
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
          this.callApiToBDList();
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
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditBDDialog(data:any){
    let config: MatDialogConfig = {
      panelClass: 'myBdEditDialogClass',
      data: data
    };
    const dialogRef = this.dialog.open(BdEditComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      this.callApiToBDList();
    });
  }

  gotoAccountsection(bdData:any){
    this.router.navigate(["dashboard/bd-account", bdData.businessDeveloperId]);
  }

}
