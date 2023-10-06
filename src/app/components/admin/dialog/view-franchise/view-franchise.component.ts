import { Component, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from "@angular/core";

@Component({
  selector: "app-view-franchise",
  templateUrl: "./view-franchise.component.html",
  styleUrls: ["./view-franchise.component.css"],
})
export class ViewFranchiseComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }

  ngOnInit() {}
  clickOk(){
    
  }
}
