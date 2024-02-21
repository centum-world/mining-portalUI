import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';

@Component({
  selector: 'app-rig-payout',
  templateUrl: './rig-payout.component.html',
  styleUrls: ['./rig-payout.component.css']
})
export class RigPayoutComponent implements OnInit {
  panelOpenState:Boolean = false;
  liquidity:number=0;
  payableAmount:number=0;
  payableCount:number=0;
  payoutDate:string="";
  
  allPayout:[] = [];
  partnerID:string="";

  constructor(private userService : UserService, private toastr : ToastrService, private route: ActivatedRoute, private router: Router) { 
    this.route.params.subscribe((params) => {
      this.partnerID = params["id"];
    });
  }

  ngOnInit() {
    this.callApiToPartnerPayoutEveryMonth();
  }

  callApiToPartnerPayoutEveryMonth(){
    let data ={
      rigId : this.partnerID
    }

    this.userService.callApiToPartnerPayout(data).subscribe({
      next:(res:any)=>{
        console.log(res.data.length)
        this.allPayout = res.data;
        this.liquidity = res.data[res.data.length - 1].liquidity;
        this.payoutDate = res.data[res.data.length - 1].payoutDate;
        this.payableCount = res.data[res.data.length - 1].payableCount;
        this.payableAmount = res.data[res.data.length - 1].payableAmount;
      },
      error:(error)=>{
        this.toastr.warning(error.error.message)
      }
    })
  }

  goBack(){
    this.router.navigate(["/miningdashboard/home"])
  }

}
