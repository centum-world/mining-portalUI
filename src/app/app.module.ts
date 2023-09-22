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
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

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
    StatehandlerRegisterComponent
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
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    ToastrModule.forRoot({
      positionClass: "toast-top-right",
      progressBar: true,
      progressAnimation: "increasing",
      preventDuplicates: true,
      timeOut: 2000
    }),




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
