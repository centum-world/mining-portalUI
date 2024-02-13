import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { MatDialogConfig } from "@angular/material";
import { UserService } from "src/app/service/user.service";
import { MatTableDataSource } from "@angular/material/table";
import { PartnerViewComponent } from "../../admin/dialog/partner-view/partner-view.component";
import { MyQueryComponent } from "../dialog/my-query/my-query.component";
import { PdfService } from "src/app/pdfService/pdf.service";

// import image from '../../../../assets/image/pdfBond.png';

interface Partner {
  p_userid: string;
  p_name: string;
  p_lname: string;
  p_email: string;
  p_phone: string;
  p_address: string;
  p_liquidity: string;
  p_refferal_id: string;
  p_reffered_id: string;
  isBlocked: string;
  isVerify: string;
  actions: string;
}
@Component({
  selector: "app-mining-details",
  templateUrl: "./mining-details.component.html",
  styleUrls: ["./mining-details.component.css"],
})
export class MiningDetailsComponent implements OnInit {
  hideContent = false;

  query = [];
  displayedColumns: string[] = [
    "p_userid",
    "p_name",
    "p_lname",
    "p_email",
    "p_phone",
    "p_address",
    "p_liquidity",
    "p_refferal_id",
    "p_reffered_id",
    "isBlocked",
    "isVerify",
    "actions",
  ];

  dataSource: MatTableDataSource<Partner>;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private pdfservice: PdfService
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.fetchMiningPartnerProfileDetails();
  }

  fetchMiningPartnerProfileDetails() {
    let partnerIdDetails = localStorage.getItem("partnerdetails");
    let data = {
      p_userid: partnerIdDetails,
    };
    this.userService.fetchMiningPartnerProfileDetails(data).subscribe({
      next: (res: any) => {
        this.dataSource.data = res.data;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  gotoHome() {
    this.router.navigate(["/miningdashboard/home"]);
  }
  gotoAccountsection() {
    this.router.navigate(["/miningdashboard/account"]);
  }

  openViewPartnerDialog(partner: any) {
    let config: MatDialogConfig = {
      panelClass: "myPartnerViewDialogClass",
      data: partner,
    };
    const dialogRef = this.dialog.open(PartnerViewComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Closed");
    });
  }

  downLoadPartnershipBond() {
    this.userService.fetchPartnerBond().subscribe({
      next: (res: any) => {
        console.log(res.data[0].bond);
        const bondData = res.data[0].bond;
        const pdfUrl = bondData;

        window.open(pdfUrl, "_blank");
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  toggleContent() {
    this.hideContent = !this.hideContent;
  }

  queryDetails() {
    let config: MatDialogConfig = {
      panelClass: "partnerQueryDialogClass",
      data: localStorage.getItem("partnerdetails"),
    };
    const dialogRef = this.dialog.open(MyQueryComponent, config);
    // let data ={
    //   p_userid: localStorage.getItem('partnerdetails')
    // }
    // this.userService.fetchQueery(data).subscribe({
    //   next:(res:any)=>{
    //     console.log(res.data)
    //     this.query = res.data
    //   },
    //   error:(err=>{
    //     console.log(err.error.message)
    //   })
    // })
  }
}
