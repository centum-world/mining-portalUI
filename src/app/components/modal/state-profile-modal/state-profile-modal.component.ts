import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/service/user.service';



@Component({
  selector: 'app-state-profile-modal',
  templateUrl: './state-profile-modal.component.html',
  styleUrls: ['./state-profile-modal.component.css'],
  
})
export class StateProfileModalComponent implements OnInit {

  constructor(private userService: UserService) {}
 
  shoDetails={
    fname:"",
    lname:"",
    email:"",
    gender:"",
    phone:"",
    referralId:"",
    refferedId:"",
    aadharCard:"",
    panCard:"",
    stateHandlerId:"",
    state:[],


  }

  ngOnInit() {
    this.callApiToShoDetails();
  }


  callApiToShoDetails(){
    let data = {
      stateHandlerId:localStorage.getItem('stateHandlerId')
    }

    this.userService.shoDetails(data).subscribe({
      next: (response: any) => {
        if (response) {
          console.log(response)
          this.shoDetails.fname = response.sho.fname,
          this.shoDetails.lname = response.sho.lname,
          this.shoDetails.email = response.sho.email,
          this.shoDetails.phone = response.sho.phone,
          this.shoDetails.gender = response.sho.gender,
          this.shoDetails.referralId = response.sho.referralId,
          this.shoDetails.refferedId = response.sho.referredId,
          this.shoDetails.stateHandlerId = response.sho.stateHandlerId
          this.shoDetails.aadharCard = response.sho.adharCard,
          this.shoDetails.panCard = response.sho.panCard,
          this.shoDetails.stateHandlerId = response.sho.stateHandlerId,
          this.shoDetails.state = response.sho.selectedState

        }
      },
      error: error => {
       
      }
    })
  }

}
