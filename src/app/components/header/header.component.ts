import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }
  ngOnInit() {
  }
  adminLogin(){
    this.router.navigate(['/login']);
    
  }
  memberPage(){
    this.router.navigate(['/memberlogin']);
  }
  partnerPage(){
    this.router.navigate(['/mininglogin']);
  }
  stateLogin(){
    this.router.navigate(['/statelogin']);
  }
  FranchisePage(){
    this.router.navigate(["/franchiselogin"])
  }
}
