import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-partner-refferal-withdrawal-approved',
  templateUrl: './partner-refferal-withdrawal-approved.component.html',
  styleUrls: ['./partner-refferal-withdrawal-approved.component.css']
})
export class PartnerRefferalWithdrawalApprovedComponent implements OnInit {

  refferalWithdrawalList=[];
  searchText:any;
  p:any;
  constructor( private userService: UserService, private toastr:ToastrService) { }

  ngOnInit() {
    this.refferalWithdrawalHistory();
  }


  refferalWithdrawalHistory(){
    this.userService.fetchPartnerRefferalWithdrawalApproved().subscribe({
      next:(response:any)=>{
        if(response){
          this.refferalWithdrawalList = Object.values(response.data);
          
        }
        
      },
      error:error=>{
        this.toastr.error('Something went wrong','Error');
      }
    })
  }
}
