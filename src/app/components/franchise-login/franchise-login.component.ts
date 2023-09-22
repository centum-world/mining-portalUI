import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-franchise-login',
  templateUrl: './franchise-login.component.html',
  styleUrls: ['./franchise-login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FranchiseLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  SignUpFranchise() {
    window.open('/franchiseSignUp')
  }

}