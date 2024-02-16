import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-rig-partner',
  templateUrl: './rig-partner.component.html',
  styleUrls: ['./rig-partner.component.css']
})
export class RigPartnerComponent implements OnInit {
  partnerID:String="";
  allrig: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { 
    this.route.params.subscribe((params) => {
      this.partnerID = params["id"]; // Retrieve parameter 1
    });
  }

  ngOnInit() {
    this.callApiToRigID();
  }

  callApiToRigID(){
    let data = {
      userId: this.partnerID,
    };

    this.userService.callApiToMultipleRig(data).subscribe({
      next:(response:any)=>{
        console.log(response.data)
        const newData = {
          fname: response.data[0].p_name,
          lname: response.data[0].p_lname,
          liquidity: response.data[0].p_liquidity,
          rigId: response.data[0].rigId,
          doj: response.data[0].p_dop
        };
        response.data.unshift(newData);
        response.data.splice(1, 1);
        this.allrig = response.data;
        console.log(this.allrig)
      },
      error:(error:any)=>{

      }
    })
  }


  goBack() {
    this.router.navigate(["/dashboard/partner-history"]);
  }

}
