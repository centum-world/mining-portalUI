import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-invoice-bond',
  templateUrl: './invoice-bond.component.html',
  styleUrls: ['./invoice-bond.component.css']
})
export class InvoiceBondComponent implements OnInit {
  rigId:String="";

  constructor(private router : Router, private route: ActivatedRoute,) { 
    this.route.params.subscribe((params) => {
      this.rigId = params["rigId"];
    });
    console.log(this.rigId)
  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(["/miningdashboard/home"]);
  }

}
