import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  animations: [
    trigger("typingAnimation", [
      state("start", style({ width: "0" })),
      state("typing", style({ width: "*" })),
      transition("start => typing", animate("1s linear")),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  typedText = ""; // Text that gets typed
  animationState = "start";
  isClicked = false;
  isMobileSidebarVisible = false;

  onMouseOver() {
    this.isClicked = true;
    console.log("clicked");
    setTimeout(() => {
      this.isClicked = false;
    }, 2000);
  }

  constructor(private router: Router) {}
  ngOnInit() {
    this.startTypingAnimation();
  }

  startTypingAnimation() {
    const textToType = "Mining RIG Partner";
    const typingSpeed = 200;
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < textToType.length) {
        this.typedText += textToType[index];
        index++;
        this.animationState = "typing";
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          this.typedText = ""; // Clear the text
          this.animationState = "start"; // Reset the animation state
          this.startTypingAnimation(); // Start a new loop
        }, 900); // Pause for 1 second before restarting
      }
    }, typingSpeed);
  }

  adminLogin() {
    this.router.navigate(["/login"]);
  }
  memberPage() {
    this.router.navigate(["/memberlogin"]);
  }
  partnerPage() {
    this.router.navigate(["/mininglogin"]);
  }
  stateLogin() {
    this.router.navigate(["/statelogin"]);
  }
  FranchisePage() {
    this.router.navigate(["/franchiselogin"]);
  }
  BusinessPage() {
    this.router.navigate(["/businesslogin"]);
  }
  toggleMobileSidebar() {
    console.log("button pressed");
    this.isMobileSidebarVisible = !this.isMobileSidebarVisible;
  }

  openServiceInNewTab(service: string) {
    let url = "";

    if (service === "JetTrade FX") {
      url = "http://jettradefx.in"; // Replace with the URL for JetTrade FX
    } else if (service === "Centum World") {
      url = "https://centumworld.com/"; // Replace with the URL for Centum World
    } else if (service === "Centumo Swap") {
      url = "https://centumo.centumworld.com/#/exchange"; // Replace with the URL for Centumo Swap
    }
    // Add more conditions for other services if needed

    if (url !== "") {
      window.open(url, "_blank");
    }
  }
}
