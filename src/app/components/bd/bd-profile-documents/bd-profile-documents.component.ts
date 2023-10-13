
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-bd-profile-documents',
  templateUrl: './bd-profile-documents.component.html',
  styleUrls: ['./bd-profile-documents.component.css']
})
export class BdProfileDocumentsComponent implements OnInit {

  constructor( private userService:UserService, @Inject(MAT_DIALOG_DATA) public data:any) {
    console.log(data)
   }

  ngOnInit() {
  }

}
