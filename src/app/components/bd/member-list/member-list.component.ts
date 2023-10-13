import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
// import { VerifyModalComponent } from '../diolog/verify-modal/verify-modal.component';
// import { ViewModalComponent } from '../diolog/view-modal/view-modal.component';
import { ToastrService } from 'ngx-toastr';
// import { BlockModalComponent } from '../diolog/block-modal/block-modal.component';
// import { EditFranchiseComponent } from '../diolog/edit-franchise/edit-franchise.component';
import { Router } from '@angular/router';



interface BusinessDeveloper {
  m_name: string;
  m_lname: string;
  m_userid: string;
  m_email: string;
  m_phone: string;
  m_gender: string;
  m_add: string;
  m_state: string;
  reffer_id: string;//referralId
  m_refferid: string;// referredId
  verify: string;
  actions: string;
}


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})


export class MemberListComponent implements OnInit {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = [ 'm_name', 'm_lname', 'm_email', 'm_phone', 'm_gender', 'm_add', 'm_state',
    'reffer_id', 'm_refferid', 
  ];

  bdReferralId: string = "";
  bdId:string = "";
  isBlock:boolean;

  dataSource: MatTableDataSource<BusinessDeveloper>;
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToGetAllMembersList();
    this.dataSource.paginator = this.paginator;
  }


  callApiToGetAllMembersList() {
    let data = {
      referralId: localStorage.getItem('bdRefferalId')
    }
    console.log(data)
    this.userService.getAllMemberDetails(data).subscribe({
      next: (res: any) => {
        console.log(res)
        this.dataSource.data = res.results
        //how can i conbsole her
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  // openViewFranchiseDialog(data: any) {
  //   console.log(data)
  //   let config: MatDialogConfig = {
  //     height: '45%',
  //     width: '55%',
  //     panelClass: 'myStateDialogClass',
  //     data: data
  //   };
  //   const dialogRef = this.dialog.open(ViewModalComponent, config);
  //   dialogRef.componentInstance.okClicked.subscribe(() => {
  //     console.log("clicked")
  //   })
  // }

  // openVerifyDialog(id: any) {
  //   this.franchiseReferralId = id.franchiseId
  //   let config: MatDialogConfig = {
  //      panelClass: 'franchiseVerifyDialogClass'
  //   };
  //   const dialogRef = this.dialog.open(VerifyModalComponent, config);


  //   dialogRef.componentInstance.okClicked.subscribe(() => {
  //     let data = {
  //       franchiseId: this.franchiseReferralId,
  //       isVerify: true
  //     }
  //     this.userService.shoVerifyFranchise(data).subscribe({
  //       next: (res) => {
  //         this.toastr.success('Franchsie verified')
  //         this.callApiToGetAllFranchiseList();
  //       },
  //       error: (err) => {
  //         console.log(err.data.message)
  //       }
  //     })
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log("Closed");
  //   });
  // }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // openIsBlockDialog(id: any) {
  //   this.franchiseId = id.franchiseId;
  //   this.isBlock = id.isBlocked;
  //   let config: MatDialogConfig = {
  //     height: '26%',
  //     width: '23%',
  //     panelClass: 'myStateDialogClass',
  //     data: id
  //   };
  //   const dialogRef = this.dialog.open(BlockModalComponent, config);
  //   console.log(id)

  //   dialogRef.componentInstance.okClicked.subscribe(() => {
  //     let data = {
  //       "franchiseId":this.franchiseId,
  //       "isBlocked":!this.isBlock
  //     }
  //     this.userService.blockUnblockFranchise(data).subscribe({
  //       next:(res:any)=>{
  //         this.toastr.success(res.message);
  //         this.callApiToGetAllFranchiseList();
  //       },
  //       error:(error)=>{
  //         console.log(error)
  //       }
  //     })
      
  //   })

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log("Closed");
  //   });
  // }

  // openEditFranchiseDialog(id:any){
  //   let config: MatDialogConfig = {
  //     panelClass: 'myEditDialogClass',
  //     data:id
  //   };
  //   const dialogRef = this.dialog.open(EditFranchiseComponent, config)
    
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.callApiToGetAllFranchiseList();
  //   });
  // }


  // gotoFranchiseAccount(){
  //   this.router.navigate(['/statedashboard/franchise-account']);
  // }


}
