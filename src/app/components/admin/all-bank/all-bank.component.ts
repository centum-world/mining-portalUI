import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { MatDialog } from "@angular/material/dialog";
import { MatDialogConfig } from "@angular/material/dialog";
import { ConfirmAuthorizeComponent } from '../dialog/confirm-authorize/confirm-authorize.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-bank',
  templateUrl: './all-bank.component.html',
  styleUrls: ['./all-bank.component.css']
})
export class AllBankComponent implements OnInit {
  toggle:boolean = false;
  allBanData:any[]=[];
  copyBankData:any[]=[];
  constructor(private router : Router, private toastr: ToastrService, private userService: UserService,  private dialog: MatDialog) { }

  ngOnInit() {
    this.callApiToAllBankDetails();
  }

  callApiToAllBankDetails(){
    this.userService.fetchAllBankDetails().subscribe({
      next:(response:any)=>{
      this.allBanData =   [...response.data.unverified, ...response.data.verified];
      this.copyBankData = [...response.data.unverified, ...response.data.verified];
      console.log(this.allBanData)
      },
      error:(err=>{

      })
    })
  }

  onInputChange(event:Event):void{
    const inputValue = (event.target as HTMLInputElement).value;
    this.allBanData = this.copyBankData.filter((item) =>
      item.user_id.includes(inputValue)
    );
    if (!inputValue) {
      this.callApiToAllBankDetails();
    }
  }

  doVerify(id:any){
    let config: MatDialogConfig = {
      panelClass: "authorizeDialogClass",
    };
    const dialogRef = this.dialog.open(ConfirmAuthorizeComponent, config);

    dialogRef.componentInstance.authorize.subscribe((data:any) => {
      let idData = {
        id:id
      }
      this.userService.authorizeBank(idData).subscribe({
        next:(response:any)=>{
          this.toastr.success(response.message)
          this.callApiToAllBankDetails();
        },
        error:(error=>{

        })
      })
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  gotohome(){
    this.router.navigate(['/dashboard/home'])
  }

}
