import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-franchise-team',
  templateUrl: './franchise-team.component.html',
  styleUrls: ['./franchise-team.component.css']
})
export class FranchiseTeamComponent implements OnInit {
  franchiseList = [];
  constructor(private userService : UserService) { }

  ngOnInit() {
    this.callApiToFranchiseList();
  }
  callApiToFranchiseList(){
    this.userService.fetchAllFranchise().subscribe({
      next:(res:any)=>{
        console.log(res.franchiseData);
        this.franchiseList = res.franchiseData
      },
      error:(err=>{
        console.log(err.error.message)
      })
    })
  }

}
