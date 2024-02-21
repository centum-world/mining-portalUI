import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { UserService } from "src/app/service/user.service";
import { MatTableDataSource } from "@angular/material/table";
import { PartnerViewComponent } from "../../admin/dialog/partner-view/partner-view.component";
import { MyQueryComponent } from "../dialog/my-query/my-query.component";
import { PdfService } from "src/app/pdfService/pdf.service";
import { ToastrService } from 'ngx-toastr';

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
  query: any[] = [];
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

  dataSource: MatTableDataSource<Partner> = new MatTableDataSource<Partner>([]);
  partner: Partner = {} as Partner;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private pdfservice: PdfService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.fetchMiningPartnerProfileDetails();
  }

  fetchMiningPartnerProfileDetails() {
    const partnerIdDetails = localStorage.getItem("partnerdetails");
    const data = { p_userid: partnerIdDetails };

    this.userService.fetchMiningPartnerProfileDetails(data).subscribe({
      next: (res: any) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          console.log('Data is an array:', res.data);
          this.dataSource.data = res.data as Partner[];

          // Assign the first partner in the array to the 'partner' property
          this.partner = this.dataSource.data[0];
          console.log('Partner:', this.partner);
        } else {
          console.log('Unexpected data structure or empty array:', res.data);
        }
      },
      error: (err) => {
        console.error('Error fetching partner details:', err.error.message);
      },
    });
  }

  gotoHome() {
    this.router.navigate(["/miningdashboard/home"]);
  }

  openViewPartnerDialog(partner: Partner) {
    const config: MatDialogConfig = {
      panelClass: "myPartnerViewDialogClass",
      data: partner,
    };
    const dialogRef = this.dialog.open(PartnerViewComponent, config);

    dialogRef.afterClosed().subscribe(() => {
      console.log("Dialog closed");
    });
  }

  downLoadPartnershipBond() {
    const partnerIdDetails = localStorage.getItem("partnerdetails");
    const data = { userId: partnerIdDetails };

    this.userService.fetchPartnerBond(data).subscribe({
      next: (res: any) => {
        console.log('PDF data:', res.data[0].bond);
        const pdfUrl = res.data[0].bond;
        window.open(pdfUrl, "_blank");
      },
      error: (err) => {
        console.error('Error fetching partnership bond:', err.error.message);
        this.toastr.warning("No Partnership bond Found");
      },
    });
  }

  toggleContent() {
    this.hideContent = !this.hideContent;
  }

  queryDetails() {
    const config: MatDialogConfig = {
      panelClass: "partnerQueryDialogClass",
      data: localStorage.getItem("partnerdetails"),
    };
    const dialogRef = this.dialog.open(MyQueryComponent, config);
    // Handle dialog result if needed
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Query dialog closed with result:', result);
    });
  }
}
