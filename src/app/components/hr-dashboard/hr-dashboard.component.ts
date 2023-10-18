import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ShareService } from 'src/app/shareService/share.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddMemberComponent } from '../admin/dialog/add-member/add-member.component';



@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HrDashboardComponent implements OnInit {
  viewMemberList: boolean = false;
  show_detail_list: string = '';
  partnerTotalWallet: any;
  totalLiquidityOfPartner: any;
  partnerUserId: string = '';
  helpAndSupportQuery:any;
  partnerHelpQuery:any;

  public createMember = {

    refferal_id: '',
  };


  public userExperience = [
    { name: '1 Year' },
    { name: '2 Year' },
    { name: '3 Year' },
    { name: 'Morethen 3 year' }
  ];

  memberWalletEachMonth: any;
  receiveFromPartnerView: string;
  partnerView: boolean = false;

  fileToUpload: File | null = null;
  userid = '';
  partnerTotalPayout:any;
  refferalPartner:any;
  refferalMember:any;
  totalWithdrawal:any;
  constructor(private userService: UserService,
    private shareService: ShareService,
    private router: Router,
    private toastr: ToastrService,
    private dialog:MatDialog
  ) { }

  ngOnInit() {
    this.partnerWallet();
    this.toatalLiquidityAmount();
    this.eachMonthMemberWallet();
    this.helpAndSupport();
    this.account();
  }


  //receive from child
  receivePartnerView(value) {
    this.receiveFromPartnerView = value;
    this.partnerView = true;
    this.show_detail_list = null;

  }
  //partnership bond upload
  nameControl = new FormControl('', Validators.required);
  //  Add member
  userForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    lname: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required, Validators.maxLength(13),
    Validators.minLength(13), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    address: new FormControl("", [Validators.required]),
    reffered_id: new FormControl("admin123", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    designation: new FormControl("", Validators.required),
    qualification: new FormControl("", Validators.required),
    gender: new FormControl("", [Validators.required]),
    experiance: new FormControl("", [Validators.required]),
    salary: new FormControl("", [Validators.required]),
    dob: new FormControl("", [Validators.required]),
    doj: new FormControl("", [Validators.required]),
    user_id: new FormControl("", [Validators.required]),
    user_password: new FormControl("", [Validators.required])

  });

  get Name(): FormControl {
    return this.userForm.get("name") as FormControl;
  }


  //End member



  getUserId(value) {
    this.partnerUserId = value;

    this.shareService.setPartnerUserId(this.partnerUserId);
  }

  addMemberData(userForm) {

   // this.createMember.refferal_id = this.userForm.value.user_id + Math.floor(Math.random() * 100000);
    var data = {
      m_name: this.userForm.value.name,
      m_lname: this.userForm.value.lname,
      m_phone: this.userForm.value.phone,
      m_add: this.userForm.value.address,
      m_refferid: this.userForm.value.reffered_id,
      m_state: this.userForm.value.state,
      m_email: this.userForm.value.email,
      m_designation: this.userForm.value.designation,
      m_quali: this.userForm.value.qualification,
      m_gender: this.userForm.value.gender,
      m_exp: this.userForm.value.experiance,
      m_salary: this.userForm.value.salary,
      m_dob: this.userForm.value.dob,
      m_doj: this.userForm.value.doj,
      m_userid: this.userForm.value.user_id,
      m_password: this.userForm.value.user_password,
      //reffer_id: this.createMember.refferal_id


    }

    //create member
    this.userService.createMember(data).subscribe({
      next: result => {
        if (result) {

          this.toastr.success('Member Created Successfully!', 'Success');
          userForm.reset();
        }
      },
      error: error => {
        this.toastr.error(error.error.message);
      }

    })



  }
  partnerForm = new FormGroup({
    reffered_id: new FormControl("admin123", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    lname: new FormControl("", [Validators.required]),
    aadhar: new FormControl("", [Validators.required, Validators.maxLength(12),
    Validators.minLength(12)]),
    phone: new FormControl("", [Validators.required, Validators.maxLength(13),
    Validators.minLength(13), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    email: new FormControl("", [Validators.required, Validators.email]),
    address: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    dob: new FormControl("", [Validators.required]),
    nominee_name: new FormControl("", [Validators.required]),
    nominee_aadhar: new FormControl("", [Validators.required,
    Validators.maxLength(12), Validators.minLength(12)]),
    nominee_phone: new FormControl("", [Validators.required, Validators.maxLength(13),
    Validators.minLength(13), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    dop: new FormControl("", [Validators.required]),
    liquidity: new FormControl("", [Validators.required]),
    terms: new FormControl("12 Months", [Validators.required]),
    user_id: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });


  //Mining Partner Data
  public createMiningPartner = {
    refferal_id: ''

  }



  //created mining partner
  addMiningData(partnerForm) {
    // this.createMiningPartner.refferal_id = this.partnerForm.value.user_id + Math.floor(Math.random() * 100000);

    var data = {
      p_reffered_id: this.partnerForm.value.reffered_id,
      p_name: this.partnerForm.value.name,
      p_lname: this.partnerForm.value.lname,
      p_aadhar: this.partnerForm.value.aadhar,
      p_phone: this.partnerForm.value.phone,
      p_email: this.partnerForm.value.email,
      p_address: this.partnerForm.value.address,
      p_state: this.partnerForm.value.state,
      p_dob: this.partnerForm.value.dob,
      p_nominee_name: this.partnerForm.value.nominee_name,
      p_nominee_aadhar: this.partnerForm.value.nominee_aadhar,
      p_nominee_phone: this.partnerForm.value.nominee_phone,
      p_dop: this.partnerForm.value.dop,
      p_liquidity: this.partnerForm.value.liquidity,
      terms: this.partnerForm.value.terms,
      p_userid: this.partnerForm.value.user_id,
      p_password: this.partnerForm.value.password,
      //p_refferal_id: this.createMiningPartner.refferal_id
    }

    //call api to create mining partner
    this.userService.createMiningPartner(data).subscribe({
      next: result => {
        if (result) {

          this.toastr.success('Partner created successfully', 'Success');
          partnerForm.reset();
        }
      },
      error: error => {
        this.toastr.error(error.error.message);
      }
    })


  }

  //Total Liquidity Api call
  toatalLiquidityAmount() {
    this.userService.totalLiquidityOfPartner().subscribe({
      next: (result: any) => {
        if (result) {
          this.totalLiquidityOfPartner = result.data[0].sumofliquidity;
        }

      },
      error: error => {
        this.toastr.error('Something went wrong', 'Error');
      }
    }


    )

  }

  viewList(view) {
    this.partnerView = false;
    if (view === 'view_member') {
      this.viewMemberList = true;
      this.show_detail_list = view;
    } else if (view === 'view_mining_partner') {
      this.viewMemberList = true;
      this.show_detail_list = view;
    } else if (view === 'active_partner') {
      this.viewMemberList = true;
      this.show_detail_list = view;
    } else if (view === 'send_withdrawal') {
      this.viewMemberList = true;
      this.show_detail_list = view;


    } else if (view === 'approved_withdrawal') {
      this.viewMemberList = true;
      this.show_detail_list = view;
    } else if (view === 'send_withdrawal_member') {
      this.viewMemberList = true;
      this.show_detail_list = view;
    } else if (view === 'approved-member-history') {
      this.viewMemberList = true;
      this.show_detail_list = view;
    } else if (view === 'pending_payment') {
      this.viewMemberList = true;
      this.show_detail_list = view;
    } else if (view === 'refferal_request') {
      this.viewMemberList = true;
      this.show_detail_list = view;
    } else if (view === 'refferal_approved') {
      this.viewMemberList = true;
      this.show_detail_list = view;
    }


  }


  //partner wallet
  partnerWallet() {
    this.userService.partnerWalletShownInAdminPanel().subscribe({
      next: (result: any) => {
        if (result) {
          this.partnerTotalWallet = Object.values(result.data);
        }
      },
      error: error => {
        this.toastr.error('Somthing went wrong', 'Error');
      }
    })


  }

  //member wallet each month

  eachMonthMemberWallet() {
    this.userService.fetchMemberWalletOfMonth().subscribe({
      next: (response: any) => {
        if (response) {
          this.memberWalletEachMonth = Object.values(response.data);
        }
      },
      error: error => {
        this.toastr.error('Something went wrong', 'Error');
      }
    }

    )

  }

  // upload pdf
  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
  }
  onSubmit() {
    // let data = {
    //   bondFile: this.fileToUpload,
    //   p_userid: this.userid
    // }
    const formData = new FormData();
    formData.append('bondFile', this.fileToUpload);
    formData.append('p_userid', this.userid);
    console.log(formData);
    
    this.userService.uploadBondFile(formData).subscribe({
      next: (result: any) => {
        if (result) {
          this.toastr.success('Uploaded successfully!')
        }
      },
      error: error => {
        this.toastr.error('Something went wrong', 'Error');
      }
    })
  }

  // help and support

  helpAndSupport() {
    this.userService.HelpAndSupport().subscribe({
      next: (result: any) => {
        if (result) {
          this.helpAndSupportQuery = Object.values(result.data);
          // console.log(this.helpAndSupportQuery);
          // console.log(this.helpAndSupportQuery[0].p_userid);
          // console.log(this.helpAndSupportQuery[0].query);
          
          
        }
      },
      error: error => {
        this.toastr.error('Somthing went wrong', 'Error');
      }
    })


  }
  helpAndSupportQueries(user,id){
    console.log(user,id)

    let data = {
      id:id
    }
    this.userService.helpAndSupportSingleQuery(data).subscribe({
      next: (result: any) => {
        this.partnerHelpQuery = result.data[0].query;
        
      },
      error: error => {
        this.toastr.error('Somthing went wrong', 'Error');
      }

    })
  }

  account(){
    this.userService.acountTotalPayout().subscribe({
      next: (result: any) => {
        this.partnerTotalPayout = result.partner;
        this.refferalPartner = result.reffrePartner;
        this.refferalMember = result.refferalMember;
        this.totalWithdrawal = result.totalWithdrawal;
      },
      error: error => {

      }
    })
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userdetail');
    // localStorage.removeItem('')
    localStorage.clear();

  }


  activePartnerViewList(){
    this.router.navigate(['/dashboard/active-partners'])
  }
  viewMemberHistoryList(){
    this.router.navigate(['/dashboard/member-history'])
  }

  partnerWalletHistoryViewList(){
    this.router.navigate(['/dashboard/partner-wallet-history']);
  }

  memberWalletHistoryViewList(){
    this.router.navigate(['/dashboard/member-wallet-history']);
  }

  memberWithdrawalRequestViewList() {
    this.router.navigate(['/dashboard/member-withdrawal-request']);
  }

  miningPartnerViewList(){
    this.router.navigate(['/dashboard/partner-history'])
  }

  memberApprovedWithdrawalViewList(){
    this.router.navigate(['/dashboard/member-approved-withdrawals'])
  }

  partnerWithdrawalRequestViewList(){
    this.router.navigate(['/dashboard/partner-withdrawal-request']);
  }

  partnerApprovedWithdrawalHistoryViewList(){
    this.router.navigate(['/dashboard/partner-approved-withdrawal']);
  }

  pendingPartnersViewList(){
    this.router.navigate(['/dashboard/pending-partners']);
  }

  partnerReferralPayoutRequestViewList(){
    this.router.navigate(['/dashboard/partner-referral-payout-request']);
  }

  partnerReferralPayoutApprovedViewList(){
    this.router.navigate(['/dashboard/partner-referral-payout-approved'])
  }
  
  redirectToNewPage() {
    this.router.navigate(['/dashboard/addmember'])
  }

}
