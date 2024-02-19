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
  lastPayout:[] = [];
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
        this.lastPayout = res.data[res.data.length - 1]
        console.log(this.lastPayout)
      },
      error:(error)=>{
        this.toastr.warning(error.error.message)
      }
    })
  }


}
