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
          this.shoDetails.lname = response.sho.lname
        }
      },
      error: error => {
       
      }
    })
  }

}
