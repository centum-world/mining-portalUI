import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-active-partner',
  templateUrl: './active-partner.component.html',
  styleUrls: ['./active-partner.component.css']
})
export class ActivePartnerComponent implements OnInit {

  constructor( private userService: UserService, private toastr:ToastrService) { }
  activePartnerListing:any;
  searchText:any;
  p:any;
  display:string='';
  ngOnInit() {
    this.activePartner();
  }

  //Active partner details in admin panel
  activePartner(){
    this.userService.activePartnerApi().subscribe({
      next:(response:any)=>{
        if(response){
          this.activePartnerListing = Object.values(response.data);
          // console.log(this.activePartnerListing[0].p_name);
          
        }
      },
      error:error=>{
        this.toastr.error('Something went wrong','Error');
      }
    }
     
    )
     
  }

  
  getColor(month,status):string{
    if(month === 11 && status===0){
      this.display = 'Completed';
      return 'RGBA(94,167,88,0.9)';
    }
    if(status === 1 && month < 11){
      this.display = 'Active';
      return 'RGBA(94,167,88,0.9)';

    }
  }

}
