import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-my-payout-history",
  templateUrl: "./my-payout-history.component.html",
  styleUrls: ["./my-payout-history.component.css"],
})
export class MyPayoutHistoryComponent implements OnInit {
  data: any[] = [];
  payableCount: number = 0;
  payoutDate: string = "";
  allPayout: [] = [];
  RigID: string = "";
  allRigId: [] = [];
  allName:[]=[];
  mergeData:[] =[];

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.callApiToPartnerPayoutCount();
  }

  
  callApiToPartnerPayoutCount() {
    let rigid = localStorage.getItem("RIGID");
    let lastThreeDigits = rigid.slice(-3);
    console.log("Last three digits:", lastThreeDigits);
    let data = {
      rigId: lastThreeDigits,
    };

    this.userService.callApiToFetchMyPayoutCount(data).subscribe({
      next: (res: any) => {
        console.log(res.data, 69);
        this.data = res.data;
        const rigIds: string[] = res.data.map((item: any) => item.rigId);

       this.apiCallToFetchName(rigIds, this.data)

      },
      error: (error) => {
        this.toastr.warning(error.error.message);
      },
    });
  }

  apiCallToFetchName(rigIds:any, allData:any){
    console.log(rigIds,80)
    let data = {
      rigIds: rigIds,
    };
    this.userService.callApiToFetchNameFromRigId(data).subscribe({
      next: (res: any) => {
        console.log(res.data, 61);
        this.allName = res.data;
        this.mergeData = allData.map((obj:any, index:any) => ({
          ...obj,
          ...res.data[index],
        }));
        // console.log(mergedArray,68)
      },
      error: (error) => {
        this.toastr.warning(error.error.message);
      },
    });
  }
}
