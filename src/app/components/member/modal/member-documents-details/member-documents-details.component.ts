import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-member-documents-details',
  templateUrl: './member-documents-details.component.html',
  styleUrls: ['./member-documents-details.component.css']
})
export class MemberDocumentsDetailsComponent implements OnInit {

  constructor( private userService:UserService, @Inject(MAT_DIALOG_DATA) public data:any) {
    console.log(data)
  }

  ngOnInit() {
  }

}
