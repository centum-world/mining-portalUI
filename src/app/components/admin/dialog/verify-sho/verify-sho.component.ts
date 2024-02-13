import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-verify-sho",
  templateUrl: "./verify-sho.component.html",
  styleUrls: ["./verify-sho.component.css"],
})
export class VerifyShoComponent implements OnInit {
  @Output() okClicked: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  verifySho() {
    this.okClicked.emit();
  }
}
