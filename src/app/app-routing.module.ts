import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  LoginComponent} from './components/login/login.component';
import { HrDashboardComponent } from './components/hr-dashboard/hr-dashboard.component';
import { FrameComponent } from './components/frame/frame.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { MemberDashboardComponent } from './components/member-dashboard/member-dashboard.component';
import { MiningDashboardComponent } from './components/mining-dashboard/mining-dashboard.component';
import { MiningLoginComponent } from './components/mining-login/mining-login.component';
import { SendWithdrawalAmountComponent } from './components/send-withdrawal-amount/send-withdrawal-amount.component';
import { GuardGuard } from './authGuard/guard.guard';
import { SignupMemberComponent } from './components/signup-member/signup-member.component';
import { SignupPartnerComponent } from './components/signup-partner/signup-partner.component';
import { StatehandlerloginComponent } from './components/statehandlerlogin/statehandlerlogin.component';
import { StatehandlerRegisterComponent } from './components/statehandler-register/statehandler-register.component';

const routes: Routes = [

  { path: 'login', component:LoginComponent},
  { path: 'member-signup', component:SignupMemberComponent},
  { path: 'partner-signup', component:SignupPartnerComponent},
  { path: 'dashboard',canActivate:[GuardGuard], component:HrDashboardComponent},
  { path: 'frame', component:FrameComponent},
  { path: 'memberlogin', component:UserLoginComponent},
  { path: 'memberdashboard',canActivate:[GuardGuard], component:MemberDashboardComponent},
  { path: 'mininglogin', component:MiningLoginComponent},
  { path: 'miningdashboard',canActivate:[GuardGuard],component:MiningDashboardComponent},
  { path: 'dashboard/sendwithdrawal',canActivate:[GuardGuard],component:SendWithdrawalAmountComponent },
  { path: 'statelogin', component:StatehandlerloginComponent},
  { path: 'stateRegitration', component:StatehandlerRegisterComponent},
  { path: '', component:HeaderComponent},
  { path: '**', component:PageNotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
