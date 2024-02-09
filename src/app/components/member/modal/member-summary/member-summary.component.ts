import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialog,  } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { MemberSummaryAmountComponent } from '../member-summary-amount/member-summary-amount.component';

@Component({
  selector: 'app-member-summary',
  templateUrl: './member-summary.component.html',
  styleUrls: ['./member-summary.component.css']
})
export class MemberSummaryComponent implements OnInit {
  monthlyPayment: any;
  displayedColumns: string[] = ['srNo','name', 'userId','dop', 'action'];
  dataSource: MatTableDataSource<any>; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private toastr: ToastrService,private userService:UserService,private dialog:MatDialog) {
    this.dataSource = new MatTableDataSource<any>(data);
    console.log(this.dataSource,'16')
  }

  fetchPartnerLiquidityDialog(partnerid) {
    let liquidity = '';
    let data = {
      p_userid: partnerid
    }
    this.userService.fetchPartnerLiquidity(data).subscribe({
      next: (response: any) => {
        liquidity = response.data[0].p_liquidity;
        console.log(liquidity,'30')
        if (parseInt(liquidity) === 1200000) {
          this.monthlyPayment = 22000;
        }
        if (parseInt(liquidity) === 600000) {
          this.monthlyPayment = 11000;
        }
        if (parseInt(liquidity) === 300000) {
          this.monthlyPayment = 5500;
        }
        if (parseInt(liquidity) === 200000) {
          this.monthlyPayment = 3700;
        }
        if (parseInt(liquidity) === 100000) {
          this.monthlyPayment = 1850;
        }

        let config:MatDialogConfig = {
          panelClass:'memberSummaryAmountDialogClass',data:this.monthlyPayment
        };
        const dialogRef = this.dialog.open(MemberSummaryAmountComponent,config);
        dialogRef.afterClosed().subscribe(result=>{
         console.log('The dialog was closed') 
        });
      },
      error: error => {
        this.toastr.error("Something went wrong", 'Error');
      }
    })
  }
  ngOnInit() {

   
  }
}
