import { Component, OnInit } from '@angular/core';
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-partner-query',
  templateUrl: './partner-query.component.html',
  styleUrls: ['./partner-query.component.css']
})
export class PartnerQueryComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userServce : UserService, private toastr: ToastrService) {
    console.log(data)
   }

  ngOnInit() {
    
  }



}
