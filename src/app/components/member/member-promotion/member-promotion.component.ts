import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-member-promotion',
  templateUrl: './member-promotion.component.html',
  styleUrls: ['./member-promotion.component.css']
})
export class MemberPromotionComponent implements OnInit {
  panelOpenState:false;
  constructor(private router : Router) { }

  ngOnInit() {
  }

  gotohome(){
    this.router.navigate(['/memberdashboard/home'])
  }
}
