import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-rig-account",
  templateUrl: "./rig-account.component.html",
  styleUrls: ["./rig-account.component.css"],
})
export class RigAccountComponent implements OnInit {
  data: any[] = [];
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.callApiToMultipleAccount();
  }

  callApiToMultipleAccount() {
    let data = {
      userId: localStorage.getItem("partnerdetails"),
    };
    this.userService.callApiToMultipleRig(data).subscribe({
      next: (response: any) => {
        console.log(response.data);
        const newData = {
          fname: response.data[0].p_name,
          lname: response.data[0].p_lname,
          liquidity: response.data[0].p_liquidity,
          rigId: response.data[0].rigId,
          partner_status: response.data[0].partner_status,
          invoice: response.data[0].invoice,
          bond: response.data[0].bond,
          dop: response.data[0].p_dop,
        };
        response.data.unshift(newData);
        response.data.splice(1, 1);
        this.data = response.data;
      },
      error: (error) => {},
    });
  }

  gotoPartnerPayout(data: any) {
    console.log(data.rigId);
    this.router.navigate(["miningdashboard/rig-payout", data.rigId]);
  }
  gotoDownloadInvoceAndBond(data:any){
    this.router.navigate(["miningdashboard/invoice-bond", data.rigId]);
  }

  // downloadInvoice(data: any) {
  //   console.log(data.invoice);
  //   const pdfUrl = data.invoice;

  //   if (pdfUrl) {
  //     const link = document.createElement("a");
  //     link.href = pdfUrl;
  //     link.target = "_blank";
  //     link.download = "invoice.pdf";
  //     link.click();
  //   } else {
  //     this.toastr.warning("Invoice is not available.");
  //   }
  // }
  // downloadBond(data: any) {
  //   console.log(data.bond);
  //   const pdfUrl = data.bond;

  //   if (pdfUrl) {
  //     const link = document.createElement("a");
  //     link.href = pdfUrl;
  //     link.target = "_blank";
  //     link.download = "bond.pdf";
  //     link.click();
  //   } else {
  //     this.toastr.warning("Bond is not available.");
  //   }
  // }
}
