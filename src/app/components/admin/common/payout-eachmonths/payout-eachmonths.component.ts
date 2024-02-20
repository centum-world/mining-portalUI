import { Component, OnInit,  Input } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payout-eachmonths',
  templateUrl: './payout-eachmonths.component.html',
  styleUrls: ['./payout-eachmonths.component.css']
})
export class PayoutEachmonthsComponent implements OnInit {
  @Input() id: string = "";
  @Input() userId: string = "";
  panelOpenState:Boolean = false;
  liquidity:number=0;
  payableAmount:number=0;
  payableCount:number=0;
  payoutDate:string="";
  
  allPayout:[] = [];
  constructor(private userService : UserService, private toastr : ToastrService) { }

  ngOnInit() {
    this.callApiToPartnerPayoutEveryMonth();
  }

  callApiToPartnerPayoutEveryMonth(){
    let data ={
      rigId : this.id
    }

    this.userService.callApiToPartnerPayout(data).subscribe({
      next:(res:any)=>{
        console.log(res.data)
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


}
