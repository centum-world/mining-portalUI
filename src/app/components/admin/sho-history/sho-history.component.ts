import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { BlockShoComponent } from '../dialog/block-sho/block-sho.component';
import { VerifyShoComponent } from '../dialog/verify-sho/verify-sho.component';

interface Sho {
  stateHandlerId: '',
  fname: string,
  lname: string,
  phone: string,
  email: string,
  gender: string,
  referralId: string,
  selectedState: string,
  actions: string,
}
@Component({
  selector: 'app-sho-history',
  templateUrl: './sho-history.component.html',
  styleUrls: ['./sho-history.component.css']
})
export class ShoHistoryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['stateHandlerId', 'fname', 'lname', 'email', 'phone', 'gender',
    'referralId', 'selectedState', 'actions'];
  dataSource: MatTableDataSource<Sho>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToFetchAllSho();
    this.dataSource.paginator = this.paginator;
  }


  callApiToFetchAllSho() {
    this.userService.callApiToFetchShoAllDetails().subscribe({
      next: (res: any) => {
        console.log(res.shoData)
        this.dataSource.data = res.shoData
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openIsBlockDialog(shoData: any) {
    console.log(shoData)

    let config: MatDialogConfig = {
      height: '26%',
      width: '23%',
      panelClass: 'myStateDialogClass',
      data: shoData
    };
    const dialogRef = this.dialog.open(BlockShoComponent, config);
    dialogRef.componentInstance.okClicked.subscribe(() => {
      console.log("clicked")
      let data = {
        "isBlocked": !shoData.isBlocked,
        "stateHandlerId": shoData.stateHandlerId
      }
      this.userService.callApiToBlockOrUnblockSho(data).subscribe({
        next: (res: any) => {
          console.log(res)
          this.callApiToFetchAllSho();
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

  openVerifyDialog(shoData: any) {
    let config: MatDialogConfig = {
      height: '26%',
      width: '23%',
      panelClass: 'myStateDialogClass',
      data: shoData
    };
    const dialogRef = this.dialog.open(VerifyShoComponent, config);
    dialogRef.componentInstance.okClicked.subscribe(() => {
      console.log("clicked")
      let data = {
        "isVerify": true,
        "stateHandlerId": shoData.stateHandlerId
      }
      this.userService.callApiToAdminVerifySho(data).subscribe({
        next: (res: any) => {
          console.log(res)
          this.callApiToFetchAllSho();
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

  openViewShoDialog(shoData:any){
    let config: MatDialogConfig = {
      panelClass: 'myStateDialogClass',
      data: shoData
    };
    const dialogRef = this.dialog.open(VerifyShoComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      console.log("Closed");
    });
  }

}
