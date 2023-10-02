import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-state-profile-documents',
  templateUrl: './state-profile-documents.component.html',
  styleUrls: ['./state-profile-documents.component.css']
})
export class StateProfileDocumentsComponent implements OnInit {

  displayStateHandlerId = localStorage.getItem('stateHandlerId')

  constructor( private userService:UserService, @Inject(MAT_DIALOG_DATA) public data:any) {
    console.log(data)
  }

  ngOnInit() {
  }

}
