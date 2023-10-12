import { Component,  OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-bd-profile-details',
  templateUrl: './bd-profile-details.component.html',
  styleUrls: ['./bd-profile-details.component.css']
})
export class BdProfileDetailsComponent implements OnInit {

  constructor(private userService : UserService, @Inject (MAT_DIALOG_DATA) public data: any) {
    console.log(data)
   }

  ngOnInit() {
  }

}
