import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';



@Component({
  selector: 'app-sho-view',
  templateUrl: './sho-view.component.html',
  styleUrls: ['./sho-view.component.css']
})
export class ShoViewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
   }

  ngOnInit() {
  }

}
