import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-bmm-promotion',
  templateUrl: './bmm-promotion.component.html',
  styleUrls: ['./bmm-promotion.component.css']
})
export class BmmPromotionComponent implements OnInit {
  panelOpenState:false;
  constructor(private router : Router) { }

  ngOnInit() {
  }

  gotohome(){
    this.router.navigate(['/statedashboard']);
  }
}
