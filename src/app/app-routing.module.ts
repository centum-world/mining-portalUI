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
import { MemberHistoryComponent } from "./components/admin/member-history/member-history.component";
import { PartnerHistoryComponent } from "./components/admin/partner-history/partner-history.component";
import { AccountShoComponent } from "./components/admin/account-sho/account-sho.component";
import { PaymentRequestComponent } from "./components/sho/payment-request/payment-request.component";
import { FranchiseAccountComponent } from "./franchise-account/franchise-account.component";
import { ActivePartnersHistoryComponent } from "./components/admin/active-partners-history/active-partners-history.component";
import { PartnerWalletHistoryComponent } from "./components/admin/partner-wallet-history/partner-wallet-history.component";
import { MemberWalletHistoryComponent } from "./components/admin/member-wallet-history/member-wallet-history.component";
import { MemberWithdrawalRequestComponent } from "./components/admin/member-withdrawal-request/member-withdrawal-request.component";
import { MemberApprovedWithdrawalHistoryComponent } from "./components/admin/member-approved-withdrawal-history/member-approved-withdrawal-history.component";
import { PartnerWithdrawalRequestComponent } from "./components/admin/partner-withdrawal-request/partner-withdrawal-request.component";
import { PartnerApprovedWithdrawalHistoryComponent } from "./components/admin/partner-approved-withdrawal-history/partner-approved-withdrawal-history.component";
import { PendingPartnersComponent } from "./components/admin/pending-partners/pending-partners.component";
import { PartnerReferralPayoutRequestComponent } from "./components/admin/partner-referral-payout-request/partner-referral-payout-request.component";
import { PartnerReferralPayoutApprovedComponent } from "./components/admin/partner-referral-payout-approved/partner-referral-payout-approved.component";
import { PartnerAccountComponent } from "./components/admin/partner-account/partner-account.component";
import { MemberAccountComponent } from "./components/admin/member-account/member-account.component";

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
      {path: "member-history", component : MemberHistoryComponent},
      {path: "partner-history", component: PartnerHistoryComponent},
      {path: "sho-history", component: ShoHistoryComponent},
      {path: "franchise-history", component: FranchiseHistoryComponentComponent},
      {path:"active-partners",component:ActivePartnersHistoryComponent},
      {path: "sho-account/:id", component : AccountShoComponent},
      {path: "partner-wallet-history", component:PartnerWalletHistoryComponent},
      {path:"member-wallet-history",component:MemberWalletHistoryComponent},
      {path:"member-withdrawal-request", component:MemberWithdrawalRequestComponent },
      {path:"member-approved-withdrawals",component:MemberApprovedWithdrawalHistoryComponent},
      {path:"partner-withdrawal-request",component:PartnerWithdrawalRequestComponent},
      {path:"partner-approved-withdrawal",component:PartnerApprovedWithdrawalHistoryComponent},
      {path:"partner-referral-payout-request",component:PartnerReferralPayoutRequestComponent},
      {path:"pending-partners",component:PendingPartnersComponent},
      {path:"partner-referral-payout-approved",component:PartnerReferralPayoutApprovedComponent},
      {path:"partner-account/:id",component:PartnerAccountComponent},
      {path:"member-account/:id",component:MemberAccountComponent},
      { path: "", redirectTo: "/dashboard/home", pathMatch: "full" },
      {path: "franchise-account/:id", component: FranchiseAccountComponent}
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
      { path: "withdrawal-list", component: PaymentRequestComponent},
      { path: "", redirectTo: "/statedashboard/home", pathMatch: "full" },
    ],
  },
  {
    path: "franchisedashboard",
    canActivate:[GuardGuard],
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
