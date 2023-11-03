import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-sho-team',
  templateUrl: './sho-team.component.html',
  styleUrls: ['./sho-team.component.css']
})
export class ShoTeamComponent implements OnInit {
  allSho = [];
  constructor(private userService : UserService) { }

  ngOnInit() {
    this.callApiToAllShoTeam();
  }

  callApiToAllShoTeam(){
    this.userService.callApiToFetchShoAllDetails().subscribe({
      next:(res:any)=>{
        console.log(res.shoData)
        this.allSho = res.shoData
      },
      error:(err=>{
        console.log(err.error.message)
      })
    })
  }

}
