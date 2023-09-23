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
  isHovered = false;

  onMouseOver() {
    this.isHovered = true;
  }

  onMouseOut() {
    this.isHovered = false;
  }

  constructor(private router: Router) {}
  ngOnInit() {
    this.startTypingAnimation();
  }

  startTypingAnimation() {
    const textToType = "ining Rig Partner"; // Text to be typed
    const typingSpeed = 200; // Adjust typing speed (milliseconds per character)
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < textToType.length) {
        this.typedText += textToType[index];
        index++;
        this.animationState = "typing"; // Start the typing animation
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
}
