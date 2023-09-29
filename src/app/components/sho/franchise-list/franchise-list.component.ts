import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { VerifyModalComponent } from '../diolog/verify-modal/verify-modal.component';
import { ViewModalComponent } from '../diolog/view-modal/view-modal.component';

interface Franchise {
  fname: string;
  lname : string;
  franchiseId:string;
  email: string;
  phone: string;
  gender : string;
  franchiseCity : string;
  franchiseState:string;
  referralId:string;
  referredId:string;
  actions: string;
}

@Component({
  selector: 'app-franchise-list',
  templateUrl: './franchise-list.component.html',
  styleUrls: ['./franchise-list.component.css']
})
export class FranchiseListComponent implements OnInit {

  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['franchiseId' ,'fname', 'lname','email', 'phone', 'gender', 'franchiseCity', 'franchiseState', 
  'referralId' , 'referredId', 'actions'
];
  dataSource: MatTableDataSource<Franchise>;
  constructor(private userService : UserService, private dialog : MatDialog) {
    // Dummy data
    //const dummyData: Franchise[] = [];
    this.dataSource = new MatTableDataSource([]);

  }

  ngOnInit() {
    this.callApiToGetAllFranchiseList();
    this.dataSource.paginator = this.paginator;
  }


  callApiToGetAllFranchiseList(){
    let data = {
      referralId : localStorage.getItem('stateRefferalId')
    }
    console.log(data)
    this.userService.getAllFranchiseDetails(data).subscribe({
      next:(res:any)=>{
        console.log(res.franchise)
        this.dataSource.data = res.franchise
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

   viewFranchise(data){
    console.log(data)
  }

  openVerifyDialog() {
    let config: MatDialogConfig = {
      height:'30%', width:'40%', panelClass:'myStateDialogClass'
    };
    const dialogRef = this.dialog.open(VerifyModalComponent,config);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Do something with the result if needed
    });
  }

}
