import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { HrDashboardComponent } from "./components/hr-dashboard/hr-dashboard.component";
import { FrameComponent } from "./components/frame/frame.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { HeaderComponent } from "./components/header/header.component";
import { UserLoginComponent } from "./components/user-login/user-login.component";
import { MemberDashboardComponent } from "./components/member-dashboard/member-dashboard.component";
import { MiningDashboardComponent } from "./components/mining-dashboard/mining-dashboard.component";
import { MiningLoginComponent } from "./components/mining-login/mining-login.component";
import { SendWithdrawalAmountComponent } from "./components/send-withdrawal-amount/send-withdrawal-amount.component";
import { GuardGuard } from "./authGuard/guard.guard";
import { SignupMemberComponent } from "./components/signup-member/signup-member.component";
import { SignupPartnerComponent } from "./components/signup-partner/signup-partner.component";
import { StatehandlerloginComponent } from "./components/statehandlerlogin/statehandlerlogin.component";
import { StatehandlerRegisterComponent } from "./components/statehandler-register/statehandler-register.component";
import { FranchiseLoginComponent } from "./components/franchise-login/franchise-login.component";
import { FranchiseSignUpComponent } from "./components/franchise-sign-up/franchise-sign-up.component";
import { StatedashboardComponent } from "./components/statedashboard/statedashboard.component";
import { AddFranchiseComponent } from "./components/add-franchise/add-franchise.component";
import { ShoCardComponent } from "./components/sho/sho-card/sho-card.component";
import { StateAddFranchiseComponent } from "./components/sho/state-add-franchise/state-add-franchise.component";
import { FranchiseListComponent } from "./components/sho/franchise-list/franchise-list.component";
import { FranchisedashboardComponent } from "./franchisedashboard/franchisedashboard.component";
import { FranchiseCardComponent } from "./franchise-card/franchise-card.component";
import { importExpr } from "@angular/compiler/src/output/output_ast";
import { FranchiseProfileDetailsComponent } from "./franchise-profile-details/franchise-profile-details.component";
import { AccountFranchiseComponent } from "./components/sho/diolog/account-franchise/account-franchise.component";
import { ShoHistoryComponent } from "./components/admin/sho-history/sho-history.component";
import { AdminDashboardComponent } from "./components/admin/admin-dashboard/admin-dashboard.component";
import { FranchiseHistoryComponentComponent } from "./franchise-history-component/franchise-history-component.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "member-signup", component: SignupMemberComponent },
  { path: "partner-signup", component: SignupPartnerComponent },
  { path: "statelogin", component: StatehandlerloginComponent },
  { path: "stateRegitration", component: StatehandlerRegisterComponent },
  { path: "franchiselogin", component: FranchiseLoginComponent },
  { path: "franchiseSignUp", component: FranchiseSignUpComponent },
  {
    path: "dashboard",
    canActivate: [GuardGuard],
    component: AdminDashboardComponent,
    children:[
      {path: "home" , component : HrDashboardComponent},
      {path: "sho-history", component: ShoHistoryComponent},
      {path: "franchise-hostory", component: FranchiseHistoryComponentComponent},
      { path: "", redirectTo: "/dashboard/home", pathMatch: "full" },
    ]
  },
  { path: "frame", component: FrameComponent },
  { path: "memberlogin", component: UserLoginComponent },
  {
    path: "memberdashboard",
    canActivate: [GuardGuard],
    component: MemberDashboardComponent,
  },
  {
    path: "statedashboard",
    canActivate: [GuardGuard],
    component: StatedashboardComponent,
    children: [
      { path: "home", component: ShoCardComponent },
      { path: "add-franchise", component: StateAddFranchiseComponent },
      { path: "franchise-list", component: FranchiseListComponent },
      { path: "franchise-account", component: AccountFranchiseComponent},
      { path: "", redirectTo: "/statedashboard/home", pathMatch: "full" },
    ],
  },
  {
    path: "franchisedashboard",
    component: FranchisedashboardComponent,
    children: [
      { path: "home", component: FranchiseCardComponent },
      { path: "", redirectTo: "/franchisedashboard/home", pathMatch: "full" },
    ],
  },
  { path: "mininglogin", component: MiningLoginComponent },
  {
    path: "miningdashboard",
    canActivate: [GuardGuard],
    component: MiningDashboardComponent,
  },
  {
    path: "dashboard/sendwithdrawal",
    canActivate: [GuardGuard],
    component: SendWithdrawalAmountComponent,
  },
  

  { path: "", component: HeaderComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
