import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule, MatSnackBar, MatSnackBarModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule, MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatTabsModule } from '@angular/material/tabs';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HrDashboardComponent } from './components/hr-dashboard/hr-dashboard.component';
import { FrameComponent } from './components/frame/frame.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { MemberDetailsListComponent } from './components/member-details-list/member-details-list.component';
import { MemberDashboardComponent } from './components/member-dashboard/member-dashboard.component';
import { MiningPartnerDetailsComponent } from './components/mining-partner-details/mining-partner-details.component';
import { MiningDashboardComponent } from './components/mining-dashboard/mining-dashboard.component';
import { MiningLoginComponent } from './components/mining-login/mining-login.component';
import { MiningProfileDetailsComponent } from './components/mining-profile-details/mining-profile-details.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MemberPortalDetailsComponent } from './components/member-portal-details/member-portal-details.component';
import { ActivePartnerComponent } from './components/active-partner/active-partner.component';
import { SendWithdrawalAmountComponent } from './components/send-withdrawal-amount/send-withdrawal-amount.component';
import { ApprovedWithdrawalHistoryComponent } from './components/approved-withdrawal-history/approved-withdrawal-history.component';
import { PartnerSuccessHistroyComponent } from './components/partner-success-histroy/partner-success-histroy.component';
import { MemberRequestHistoryComponent } from './components/member-request-history/member-request-history.component';
import { ApprovedMemberWithdrawalHistoryComponent } from './components/approved-member-withdrawal-history/approved-member-withdrawal-history.component';
import { TokenInterceptorService } from './token/token-interceptor.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { SignupMemberComponent } from './components/signup-member/signup-member.component';
import { DatePipe } from '@angular/common';
import { SignupPartnerComponent } from './components/signup-partner/signup-partner.component';
import { PendingPartnerPaymentComponent } from './components/pending-partner-payment/pending-partner-payment.component';
import { MiningPartnerViewComponent } from './components/mining-partner-view/mining-partner-view.component';
import { PartnerRefferalWithdrawalRequestComponent } from './components/partner-refferal-withdrawal-request/partner-refferal-withdrawal-request.component';
import { PartnerRefferalWithdrawalApprovedComponent } from './components/partner-refferal-withdrawal-approved/partner-refferal-withdrawal-approved.component';
import { StatehandlerloginComponent } from './components/statehandlerlogin/statehandlerlogin.component';
import { StatehandlerRegisterComponent } from './components/statehandler-register/statehandler-register.component';
import { FranchiseLoginComponent } from './components/franchise-login/franchise-login.component';
import { FranchiseSignUpComponent } from './components/franchise-sign-up/franchise-sign-up.component';
import { StatedashboardComponent } from './components/statedashboard/statedashboard.component';
import { StateProfileModalComponent } from './components/modal/state-profile-modal/state-profile-modal.component';
import { AddFranchiseComponent } from './components/add-franchise/add-franchise.component';
import { ContactComponent } from './contact/contact.component';

import { ShoHeaderComponent } from './components/sho/sho-header/sho-header.component';
import { ShoCardComponent } from './components/sho/sho-card/sho-card.component';
import { StateAddFranchiseComponent } from './components/sho/state-add-franchise/state-add-franchise.component';
import { FranchiseListComponent } from './components/sho/franchise-list/franchise-list.component';
import { VerifyModalComponent } from './components/sho/diolog/verify-modal/verify-modal.component';
import { ViewModalComponent } from './components/sho/diolog/view-modal/view-modal.component';
import { FranchisedashboardComponent } from './franchisedashboard/franchisedashboard.component';
import { FranchiseCardComponent } from './franchise-card/franchise-card.component';
import { StateProfileDocumentsComponent } from './components/modal/state-profile-documents/state-profile-documents.component';
import { StateAddBankComponent } from './components/modal/state-add-bank/state-add-bank.component';
import { StateViewBankDetailsComponent } from './components/modal/state-view-bank-details/state-view-bank-details.component';
import { FranchiseHeaderComponent } from './franchise-header/franchise-header.component';
import { FranchiseProfileDetailsComponent } from './franchise-profile-details/franchise-profile-details.component';
import { BlockModalComponent } from './components/sho/diolog/block-modal/block-modal.component';
import { EditFranchiseComponent } from './components/sho/diolog/edit-franchise/edit-franchise.component';
import { AccountFranchiseComponent } from './components/sho/diolog/account-franchise/account-franchise.component';
import { FranchiseProfileDocumentsComponent } from './components/modal/franchise-profile-documents/franchise-profile-documents.component';
import { FranchiseAddBankComponent } from './components/modal/franchise-add-bank/franchise-add-bank.component';
import { FranchiseViewBankDetailsComponent } from './components/modal/franchise-view-bank-details/franchise-view-bank-details.component';
import { ShoHistoryComponent } from './components/admin/sho-history/sho-history.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './components/admin/admin-sidebar/admin-sidebar.component';
import { BlockShoComponent } from './components/admin/dialog/block-sho/block-sho.component';
import { VerifyShoComponent } from './components/admin/dialog/verify-sho/verify-sho.component';
import { ShoViewComponent } from './components/admin/dialog/sho-view/sho-view.component';
import { FranchiseHistoryComponentComponent } from './franchise-history-component/franchise-history-component.component';
import { BlockFranchiseComponent } from './components/admin/dialog/block-franchise/block-franchise.component';
import { VerifyFranchiseComponent } from './components/admin/dialog/verify-franchise/verify-franchise.component';
import { MemberHistoryComponent } from './components/admin/member-history/member-history.component';
import { PartnerHistoryComponent } from './components/admin/partner-history/partner-history.component';
import { ViewMemberComponent } from './components/admin/dialog/view-member/view-member.component';
import { VerifyMemberComponent } from './components/admin/dialog/verify-member/verify-member.component';
import { BlockMemberComponent } from './components/admin/dialog/block-member/block-member.component';
import { VerifyPartnerComponent } from './components/admin/dialog/verify-partner/verify-partner.component';
import { BlockMiningPartnerComponent } from './components/admin/dialog/block-mining-partner/block-mining-partner.component';
import { ViewFranchiseComponent } from './components/admin/dialog/view-franchise/view-franchise.component';
import { EditShoComponent } from './components/admin/dialog/edit-sho/edit-sho.component';
import { EditMemberComponent } from './components/admin/dialog/edit-member/edit-member.component';
import { EditPartnerComponent } from './components/admin/dialog/edit-partner/edit-partner.component';
import { AccountShoComponent } from './components/admin/account-sho/account-sho.component';
import { PaymentRequestComponent } from './components/sho/payment-request/payment-request.component';
import { WithdrawDialogComponent } from './components/sho/diolog/withdraw-dialog/withdraw-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { AdminEditFranchiseComponent } from './components/admin/dialog/admin-edit-franchise/admin-edit-franchise.component';
import { FranchiseAccountComponent } from './franchise-account/franchise-account.component';
import { ActivePartnersHistoryComponent } from './components/admin/active-partners-history/active-partners-history.component';
import { PartnerWalletHistoryComponent } from './components/admin/partner-wallet-history/partner-wallet-history.component';
import { MemberWalletHistoryComponent } from './components/admin/member-wallet-history/member-wallet-history.component';
import { MemberWithdrawalRequestComponent } from './components/admin/member-withdrawal-request/member-withdrawal-request.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HrDashboardComponent,
    FrameComponent,
    HeaderComponent,
    PageNotFoundComponent,
    DrawerComponent,
    NavbarComponent,
    HomeComponent,
    UserLoginComponent,
    MemberDetailsListComponent,
    MemberDashboardComponent,
    MiningPartnerDetailsComponent,
    MiningDashboardComponent,
    MiningLoginComponent,
    MiningProfileDetailsComponent,
    MemberPortalDetailsComponent,
    ActivePartnerComponent,
    SendWithdrawalAmountComponent,
    ApprovedWithdrawalHistoryComponent,
    PartnerSuccessHistroyComponent,
    MemberRequestHistoryComponent,
    ApprovedMemberWithdrawalHistoryComponent,
    SignupMemberComponent,
    SignupPartnerComponent,
    PendingPartnerPaymentComponent,
    MiningPartnerViewComponent,
    PartnerRefferalWithdrawalRequestComponent,
    PartnerRefferalWithdrawalApprovedComponent,
    StatehandlerloginComponent,
    StatehandlerRegisterComponent,
    FranchiseLoginComponent,
    FranchiseSignUpComponent,
    StatedashboardComponent,
    StateProfileModalComponent,
    AddFranchiseComponent,
    ContactComponent,
    ShoHeaderComponent,
    ShoCardComponent,
    StateAddFranchiseComponent,
    FranchiseListComponent,
    VerifyModalComponent,
    ViewModalComponent,
    FranchisedashboardComponent,
    FranchiseCardComponent,
    FranchiseHeaderComponent,
    FranchiseProfileDetailsComponent,
    StateProfileDocumentsComponent,
    StateAddBankComponent,
    StateViewBankDetailsComponent,
    BlockModalComponent,
    EditFranchiseComponent,
    AccountFranchiseComponent,
    FranchiseProfileDocumentsComponent,
    FranchiseAddBankComponent,
    FranchiseViewBankDetailsComponent,
    ShoHistoryComponent,
    AdminDashboardComponent,
    AdminSidebarComponent,
    BlockShoComponent,
    VerifyShoComponent,
    ShoViewComponent,
    FranchiseHistoryComponentComponent,
    BlockFranchiseComponent,
    VerifyFranchiseComponent,
    MemberHistoryComponent,
    PartnerHistoryComponent,
    ViewMemberComponent,
    VerifyMemberComponent,
    BlockMemberComponent,
    VerifyPartnerComponent,
    BlockMiningPartnerComponent,
    ViewFranchiseComponent,
    EditShoComponent,
    AdminEditFranchiseComponent,
    EditMemberComponent,
    EditPartnerComponent,
    EditShoComponent,
    AccountShoComponent,
    PaymentRequestComponent,
    WithdrawDialogComponent,
    FranchiseAccountComponent,
    ActivePartnersHistoryComponent,
    PartnerWalletHistoryComponent,
    MemberWalletHistoryComponent,
    MemberWithdrawalRequestComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatListModule,
    HttpClientModule,
    MatSidenavModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    ScrollingModule,
    MatTabsModule,
    MatRadioModule,
    RouterModule.forRoot([]),
    ToastrModule.forRoot({
      positionClass: "toast-top-right",
      progressBar: true,
      progressAnimation: "increasing",
      preventDuplicates: true,
      timeOut: 2000
    }),
    
  ],
  entryComponents: [
    StateProfileModalComponent,
    VerifyModalComponent,
    ViewModalComponent,
    StateProfileDocumentsComponent,
    StateAddBankComponent,
    StateViewBankDetailsComponent,
    BlockModalComponent,
    FranchiseProfileDocumentsComponent,
    FranchiseProfileDetailsComponent,
    FranchiseAddBankComponent,
    FranchiseViewBankDetailsComponent,
    BlockShoComponent,
    VerifyShoComponent,
    ShoViewComponent,
    BlockFranchiseComponent,
    VerifyFranchiseComponent,
    EditShoComponent,
    WithdrawDialogComponent,
    ViewMemberComponent,
    VerifyMemberComponent,
    BlockMemberComponent,
    VerifyPartnerComponent,
    BlockMiningPartnerComponent,
    ViewFranchiseComponent,
    EditMemberComponent,
    EditPartnerComponent,
    EditFranchiseComponent,
    AdminEditFranchiseComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
