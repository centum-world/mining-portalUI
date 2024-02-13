import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-popup-sidebar",
  templateUrl: "./popup-sidebar.component.html",
  styleUrls: ["./popup-sidebar.component.css"],
})
export class PopupSidebarComponent implements OnInit {
  activeItem: string | null = null;
  constructor(private router: Router) {}

  ngOnInit() {}

  isActive(item: string): boolean {
    return this.activeItem === item;
  }

  setActive(item: string): void {
    this.activeItem = item;
    if (item === "member") {
      this.router.navigate(["/dashboard/member-history"]);
    } else if (item === "partner") {
      this.router.navigate(["/dashboard/partner-history"]);
    } else if (item === "sho") {
      this.router.navigate(["/dashboard/sho-history"]);
    } else if (item === "franchise") {
      this.router.navigate(["/dashboard/franchise-history"]);
    } else if (item === "bd") {
      this.router.navigate(["/dashboard/bd-history"]);
    } else if (item === "totalLiquidity") {
      this.router.navigate(["/dashboard/active-partners"]);
    } else if (item === "partnerWallet") {
      this.router.navigate(["/dashboard/partner-wallet-history"]);
    } else if (item === "help") {
      this.router.navigate(["/dashboard/partner-wallet-history"]);
    } else if (item === "accounts") {
      this.router.navigate(["/dashboard/partner-wallet-history"]);
    } else if (item === "logout") {
      localStorage.clear();
      this.router.navigate(["/login"]);
    }
  }

  goToDashboard() {
    this.router.navigate(["/dashboard/home"]);
  }
}
