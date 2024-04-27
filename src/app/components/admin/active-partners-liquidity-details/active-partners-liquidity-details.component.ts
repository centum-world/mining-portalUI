import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/service/user.service";
import { ToastrService } from "ngx-toastr";



@Component({
  selector: "app-active-partners-liquidity-details",
  templateUrl: "./active-partners-liquidity-details.component.html",
  styleUrls: ["./active-partners-liquidity-details.component.css"],
})
export class ActivePartnersLiquidityDetailsComponent implements OnInit {
  partnerID: String = "";
  type: string = "";
  allrig: any[] = [];
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.route.params.subscribe((params) => {
      this.partnerID = params["id"];
      // this.type = params["type"];
    });
  }

  ngOnInit() {
    this.apiCallToFetchActivePartnersLiquidityDetails();
  }

  apiCallToFetchActivePartnersLiquidityDetails() {
    let data = {
      userid: this.partnerID,
    };
    this.userService
      .callApifetchActivePartnersLiquidityDetails(data)
      .subscribe({
        next:(response:any)=>{
          console.log(response.combined_data)
          const newData = {
            fname: response.combined_data[0].p_name,
            lname: response.combined_data[0].p_lname,
            liquidity: response.combined_data[0].p_liquidity,
            rigId: response.combined_data[0].rigId,
            dop: response.combined_data[0].p_dop,
            partner_status: response.combined_data[0].partner_status,
            userId:response.combined_data[0].p_userid,
            isVerify : response.combined_data[0].isVerify
          };
          response.combined_data.unshift(newData);
          response.combined_data.splice(1, 1);
          this.allrig = response.combined_data;
          console.log(this.allrig)
        },
        error:(error:any)=>{
  
        }
      });
  }


 

  goBack() {
    this.router.navigate(["/dashboard/home"]);
  }
}
