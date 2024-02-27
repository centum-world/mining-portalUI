import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-partner-payout',
  templateUrl: './partner-payout.component.html',
  styleUrls: ['./partner-payout.component.css']
})
export class PartnerPayoutComponent implements OnInit {
  partnerID:String="";
  rigId:String="";
  type:string="";
  constructor(private router : Router, private route: ActivatedRoute,) { 
    this.route.params.subscribe((params) => {
      this.partnerID = params["userId"];
      this.rigId = params["rigId"];
      this.type = params["type"];
    });
  }

  ngOnInit() {

  }


  goBack() {
    this.router.navigate([
      "dashboard/partner-account",
      this.partnerID,
      this.type
    ]);
  }

}
