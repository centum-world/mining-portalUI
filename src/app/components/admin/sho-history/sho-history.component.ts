import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core';

interface Sho {
  stateHandlerId:'',
  fname:'',
  lname:'',
  phone:'',
  email:'',
  gender:'',
  referralId:'',
  selectedState:''
}
@Component({
  selector: 'app-sho-history',
  templateUrl: './sho-history.component.html',
  styleUrls: ['./sho-history.component.css']
})
export class ShoHistoryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['stateHandlerId', 'fname', 'lname', 'email', 'phone', 'gender', 'referralId', 'selectedState'];
  dataSource: MatTableDataSource<Sho>;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.callApiToFetchAllSho();
  }


  callApiToFetchAllSho(){
    this.userService.callApiToFetchShoAllDetails().subscribe({
      next:(res:any)=>{
        console.log(res.shoData)
        this.dataSource = res.shoData
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }

}
