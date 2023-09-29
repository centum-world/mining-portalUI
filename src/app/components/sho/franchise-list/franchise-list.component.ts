import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { VerifyModalComponent } from '../diolog/verify-modal/verify-modal.component';
import { ViewModalComponent } from '../diolog/view-modal/view-modal.component';
import { ToastrService } from 'ngx-toastr';



interface Franchise {
  fname: string;
  lname: string;
  franchiseId: string;
  email: string;
  phone: string;
  gender: string;
  franchiseCity: string;
  franchiseState: string;
  referralId: string;
  referredId: string;
  verify: string;
  actions: string;
}

@Component({
  selector: 'app-franchise-list',
  templateUrl: './franchise-list.component.html',
  styleUrls: ['./franchise-list.component.css']
})
export class FranchiseListComponent implements OnInit {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['franchiseId', 'fname', 'lname', 'email', 'phone', 'gender', 'franchiseCity', 'franchiseState',
    'referralId', 'referredId', 'isVerify', 'actions'
  ];
  franchiseReferralId: string = "";
  dataSource: MatTableDataSource<Franchise>;
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToGetAllFranchiseList();
    this.dataSource.paginator = this.paginator;
  }


  callApiToGetAllFranchiseList() {
    let data = {
      referralId: localStorage.getItem('stateRefferalId')
    }
    console.log(data)
    this.userService.getAllFranchiseDetails(data).subscribe({
      next: (res: any) => {
        console.log(res.franchise)
        this.dataSource.data = res.franchise
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  openViewFranchiseDialog(data: any) {
    console.log(data)
    let config: MatDialogConfig = {
      height: '45%',
      width: '55%',
      panelClass: 'myStateDialogClass',
      data: data
    };
    const dialogRef = this.dialog.open(ViewModalComponent, config);
    dialogRef.componentInstance.okClicked.subscribe(() => {
      console.log("clicked")
    })
  }

  openVerifyDialog(id: any) {

    this.franchiseReferralId = id.franchiseId
    let config: MatDialogConfig = {
      height: '26%', width: '23%', panelClass: 'myStateDialogClass'
    };
    const dialogRef = this.dialog.open(VerifyModalComponent, config);


    dialogRef.componentInstance.okClicked.subscribe(() => {
      let data = {
        franchiseId: this.franchiseReferralId,
        isVerify: true
      }
      this.userService.shoVerifyFranchise(data).subscribe({
        next: (res) => {
          this.toastr.success('Franchsie verified')
          this.callApiToGetAllFranchiseList();
        },
        error: (err) => {
          console.log(err.data.message)
        }
      })
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Closed");
    });


  }

}
