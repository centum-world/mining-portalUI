import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-bd-header',
  templateUrl: './bd-header.component.html',
  styleUrls: ['./bd-header.component.css']
})
export class BdHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  logOut(){
    localStorage.clear();
    this.router.navigate(['/statelogin']);
  }
  refresh(){

  }
  listBussinessDeveloper(){

  }
  handleWithdrawalClick(){
    this.router.navigate(['/bd-dashboard/withdrawal-list'])
  }
  openDialog(){

  }
  openFranchiseDocumentsDialog(){
    
  }
}
