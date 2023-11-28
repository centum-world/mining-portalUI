import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-franchise-promotion',
  templateUrl: './franchise-promotion.component.html',
  styleUrls: ['./franchise-promotion.component.css']
})
export class FranchisePromotionComponent implements OnInit {
  panelOpenState:false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotohome(){
    this.router.navigate(['/franchisedashboard'])
  }

}
