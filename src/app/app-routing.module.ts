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
import { AddBusinessDeveloperComponent } from "./components/franchise/add-business-developer/add-business-developer.component";
import { ListBusinessDeveloperComponent } from "./components/franchise/list-business-developer/list-business-developer.component";
import { BdDashboardComponent } from "./components/bd/bd-dashboard/bd-dashboard.component";
import { BdLoginComponent } from "./components/bd/bd-login/bd-login.component";
import { PartnerAccountComponent } from "./components/admin/partner-account/partner-account.component";
import { MemberAccountComponent } from "./components/admin/member-account/member-account.component";
import { BdListComponent } from "./components/admin/bd-list/bd-list.component";
import { WithdrawlFranchiseComponent } from "./components/franchise/withdrawl-franchise/withdrawl-franchise.component";
import { BdCardsComponent } from "./components/bd/bd-cards/bd-cards.component";
import { BdAccountComponent } from "./components/admin/bd-account/bd-account.component";
import { BDpaymentRequestComponent } from "./components/bd/bdpayment-request/bdpayment-request.component";
import { BdSignupPageComponent } from "./components/bd/bd-signup-page/bd-signup-page.component";
import { MemberListComponent } from "./components/bd/member-list/member-list.component";
import { WithdrawalRequestHistoryComponent } from "./components/bd/withdrawal-request-history/withdrawal-request-history.component";
import { WithdrawalSuccessHistoryComponent } from "./components/bd/withdrawal-success-history/withdrawal-success-history.component";
import { BusinessDevPartnerTeamComponent } from "./components/bd/business-dev-partner-team/business-dev-partner-team.component";
import { FranchiseWithdrawalRequestComponent } from "./franchise-withdrawal-request/franchise-withdrawal-request.component";
import { FranchiseWithdrawalSuccessHistoryComponent } from "./franchise-withdrawal-success-history/franchise-withdrawal-success-history.component";
import { FranchisePartnerMyTeamComponent } from "./franchise-partner-my-team/franchise-partner-my-team.component";
import { CreateMemberComponent } from "./components/create-member/create-member.component";
import { AddMemberComponent } from "./components/admin/dialog/add-member/add-member.component";


import { MemberCardComponent } from "./components/member/member-card/member-card.component";
import { WithdrawalSuccessComponent } from "./components/member/withdrawal-success/withdrawal-success.component";
import { WithdrawalRequestComponent } from "./components/member/withdrawal-request/withdrawal-request.component";
import { DashboardMiningComponent } from "./components/mining/dashboard-mining/dashboard-mining.component";
import { MiningCardsComponent } from "./components/mining/mining-cards/mining-cards.component";
import { MiningDetailsComponent } from "./components/mining/mining-details/mining-details.component";
import { MiningAccountComponent } from "./components/mining/mining-account/mining-account.component";
import { MyTeamComponent } from "./components/member/my-team/my-team.component";
import { MiningWithdrawDetailsComponent } from "./components/mining/mining-withdraw-details/mining-withdraw-details.component";
import { MyteamPartnerComponent } from "./components/mining/myteam-partner/myteam-partner.component";
import { ReferralPayoutComponent } from "./components/mining/referral-payout/referral-payout.component";
import { StatePartnerMyTeamComponent } from "./components/sho/state-partner-my-team/state-partner-my-team.component";
import { WhitePaperComponent } from "./components/white-paper/white-paper.component";
import { ShoReferralPayoutComponent } from "./components/sho/sho-referral-payout/sho-referral-payout.component";
import { MemberReferrralPayoutComponent } from "./components/member/member-referrral-payout/member-referrral-payout.component";
import { FranchiseReferralComponent } from "./components/franchise/franchise-referral/franchise-referral.component";
import { ReferralListComponent } from "./components/franchise/referral-list/referral-list.component";
import { MyPartnerlistComponent } from "./components/member/my-partnerlist/my-partnerlist.component";
import { BmmPartnerlistComponent } from "./components/sho/bmm-partnerlist/bmm-partnerlist.component";
import { MemberPromotionComponent } from "./components/member/member-promotion/member-promotion.component";
import { FranchisePromotionComponent } from "./components/franchise/franchise-promotion/franchise-promotion.component";
import { BmmPromotionComponent } from "./components/sho/bmm-promotion/bmm-promotion.component";
import { MiningSignupComponent } from "./components/mining-signup/mining-signup.component";
import { MemberSignupComponent } from "./components/member/member-signup/member-signup.component";
import { SignupFranchiseComponent } from "./components/franchise/signup-franchise/signup-franchise.component";
import { BmmSignupLoginComponent } from "./components/sho/bmm-signup-login/bmm-signup-login.component";
import { PrivacyComponent } from "./components/common/privacy/privacy.component";
import { RigPartnerComponent } from "./components/admin/rig-partner/rig-partner.component";
import { PartnerPayoutComponent } from "./components/admin/partner-payout/partner-payout.component";
import { RigPayoutComponent } from "./components/mining/rig-payout/rig-payout.component";
import { TransactionHistoryComponent } from "./components/admin/transaction-history/transaction-history.component";
import { TodayTransactionHistoryComponent } from "./components/admin/today-transaction-history/today-transaction-history.component";
import { BmmReferralListComponent } from "./components/sho/bmm-referral-list/bmm-referral-list.component";
import { PartnerTransactionHistoryComponent } from "./components/mining/partner-transaction-history/partner-transaction-history.component";


const routes: Routes = [
  { path: "login", component: LoginComponent },
  // { path: "mininglogin", component: MiningLoginComponent },
  { path: "mininglogin", component: MiningSignupComponent},
  { path: "member-signup", component: SignupMemberComponent },
  { path: "partner-signup", component: SignupPartnerComponent },
  { path: "member-signup1",component:MemberSignupComponent},
  // { path: "statelogin", component: StatehandlerloginComponent },
  { path: "statelogin", component:BmmSignupLoginComponent },
  { path: "stateRegitration", component: StatehandlerRegisterComponent },
  { path: "franchiselogin", component: SignupFranchiseComponent },
  { path: "franchiseSignUp", component: FranchiseSignUpComponent },
  { path: "franchiseSignUp1",component:SignupFranchiseComponent},
  { path: "frame", component: FrameComponent },
  // { path: "memberlogin", component: UserLoginComponent },
  { path: "memberlogin", component:MemberSignupComponent },
  { path: "businesslogin", component: BdLoginComponent},
  { path: "business-developer-regitration", component: BdSignupPageComponent},
  {path: "whitepaper", component: WhitePaperComponent},
  {path: "privacy-policy", component: PrivacyComponent},
  {
    path: "dashboard",
    canActivate: [GuardGuard],
    canDeactivate:[GuardGuard],
    component: AdminDashboardComponent,
    children:[
      {path: "home" , component : HrDashboardComponent},
      {path: "addmember" , component : CreateMemberComponent},
      {path: "member-history", component : MemberHistoryComponent},
      {path: "partner-history", component: PartnerHistoryComponent},
      {path:"transaction-history", component:TransactionHistoryComponent},
      {path:"today-transaction-history",component:TodayTransactionHistoryComponent},
      {path: "sho-history", component: ShoHistoryComponent},
      {path: "franchise-history", component: FranchiseHistoryComponentComponent},
      {path: "bd-history", component: BdListComponent},
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
      {path:"partner-account/:id/:type",component:RigPartnerComponent},
      {path:"partner-account/:userId/:type/:rigId",component:PartnerPayoutComponent},
      {path:"member-account/:id",component:MemberAccountComponent},
      {path: "franchise-account/:id", component: FranchiseAccountComponent},
      {path:"bd-account/:id", component: BdAccountComponent},
      { path: "", redirectTo: "/dashboard/home", pathMatch: "full" },
    ]
  },
  {
    path: "miningdashboard",
    canActivate : [GuardGuard],
    canDeactivate:[GuardGuard],
    component : DashboardMiningComponent,
    children:[
      {path: "home" , component : MiningCardsComponent},
      {path: "partner-details", component : MiningDetailsComponent},
      {path: "account/:id", component: MiningAccountComponent},
      {path: "withdraw", component: MiningWithdrawDetailsComponent},
      {path: "my-team", component: MyteamPartnerComponent},
      {path: "referral-payout", component: ReferralPayoutComponent},
      {path: "rig-payout/:id", component: RigPayoutComponent},
      {path:"transaction-history",component:PartnerTransactionHistoryComponent},
      { path: "", redirectTo: "/miningdashboard/home", pathMatch: "full" },
    ] 
  },
  
  {
    path: "memberdashboard",
    canActivate: [GuardGuard],
    canDeactivate:[GuardGuard],
    component: MemberDashboardComponent,
    children:[
      { path: "home", component: MemberCardComponent },
      {path:"withdrawal-success",component:WithdrawalSuccessComponent},
      {path:"withdrawal-request",component:WithdrawalRequestComponent},
      {path:"my-team",component:MyTeamComponent},
      {path:"partner-list", component:MyPartnerlistComponent},
      {path:"promotion", component:MemberPromotionComponent},
      {path:"referral-payout", component:MemberReferrralPayoutComponent},
      {path:"todays-transaction",component:TodayTransactionHistoryComponent},
      { path: "", redirectTo: "/memberdashboard/home", pathMatch: "full" },
    ]
  },
  {
    path: "statedashboard",
    canActivate: [GuardGuard],
    canDeactivate:[GuardGuard],
    component: StatedashboardComponent,
    children: [
      { path: "home", component: ShoCardComponent },
      { path: "add-franchise", component: StateAddFranchiseComponent },
      { path: "franchise-list", component: FranchiseListComponent },
      { path: "franchise-account", component: AccountFranchiseComponent},
      { path: "withdrawal-list", component: PaymentRequestComponent},
      {path: "partner-list", component: BmmPartnerlistComponent},
      {path:"partner-team",component:StatePartnerMyTeamComponent},
      {path:"referral-payout",component:ShoReferralPayoutComponent},
      {path: "promotion", component: BmmPromotionComponent},
      {path:"referral-list",component:BmmReferralListComponent},
      { path: "", redirectTo: "/statedashboard/home", pathMatch: "full" },
    ],
  },
  {
    path: "franchisedashboard",
    canActivate:[GuardGuard],
    canDeactivate:[GuardGuard],
    component: FranchisedashboardComponent,
    children: [
      { path: "home", component: FranchiseCardComponent },
      { path: "add-bd", component: AddBusinessDeveloperComponent},
      { path: "partner-list", component: ListBusinessDeveloperComponent},
      { path: "member-list", component: ReferralListComponent},
      {path: "withdrawal-list", component: WithdrawlFranchiseComponent},
      {path:"withdrawal-request-history",component:FranchiseWithdrawalRequestComponent},
      {path:"withdrawal-history",component:FranchiseWithdrawalSuccessHistoryComponent},
      {path:"partner-my-team",component:FranchisePartnerMyTeamComponent},
      {path:"referral-payout", component: FranchiseReferralComponent},
      {path:"promotion", component: FranchisePromotionComponent},
      { path: "", redirectTo: "/franchisedashboard/home", pathMatch: "full" },
    ],
  },
  {
    path:"bd-dashboard", canActivate:[GuardGuard], component : BdDashboardComponent,
    children:[
      { path: "home", component: BdCardsComponent },
      {path: "withdrawal-list", component: BDpaymentRequestComponent},
      {path:"withdrawal-request-history",component:WithdrawalRequestHistoryComponent},
      {path:"withdrawal-success-history",component:WithdrawalSuccessHistoryComponent},
      {path:"businessDev-partner-team",component:BusinessDevPartnerTeamComponent},
      { path: "", redirectTo: "/bd-dashboard/home", pathMatch: "full" },
      {path: "member-list", component: MemberListComponent},
      {path: "add-member", component: CreateMemberComponent},
    ]
  },
  {
    path: "dashboard/sendwithdrawal",
    canActivate: [GuardGuard],
    canDeactivate:[GuardGuard],
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
