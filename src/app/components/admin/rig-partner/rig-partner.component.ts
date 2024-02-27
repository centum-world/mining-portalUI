import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogConfig } from "@angular/material/dialog";
import { ActivateMiningPartnerComponent } from '../dialog/activate-mining-partner/activate-mining-partner.component';

@Component({
  selector: 'app-rig-partner',
  templateUrl: './rig-partner.component.html',
  styleUrls: ['./rig-partner.component.css']
})
export class RigPartnerComponent implements OnInit {
  partnerID:String="";
  type:string="";
  allrig: any[] = [];
  constructor(private toastr: ToastrService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute, private userService: UserService) { 
    this.route.params.subscribe((params) => {
      this.partnerID = params["id"];
      this.type = params["type"];
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
          doj: response.data[0].p_dop,
          partner_status: response.data[0].partner_status,
          userId:response.data[0].p_userid
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

  openPartnerDoActivateDialog(miningPartnerData: any) {
    let config: MatDialogConfig = {
      panelClass: "doActivatePartnerDialogClass",
      data: miningPartnerData,
    };
    const dialogRef = this.dialog.open(ActivateMiningPartnerComponent, config);
    dialogRef.componentInstance.okClicked.subscribe(() => {
      console.log(miningPartnerData)
      let data = {
        p_userid: miningPartnerData.userId,
        rigId: miningPartnerData.rigId
      };
      this.userService.doactivatePartnerManualFromAdmin(data).subscribe({
        next: (res: any) => {
          this.callApiToRigID();
          this.toastr.success(res.message);
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
    });
  }

  rigDetails(miningPartnerData:any){
    console.log(miningPartnerData.rigId)
    this.router.navigate([
      "dashboard/partner-account",
      miningPartnerData.userId,
      this.type,
      miningPartnerData.rigId
    ]);
  }

  goBack() {
    this.router.navigate(["/dashboard/partner-history"]);
  }

}
