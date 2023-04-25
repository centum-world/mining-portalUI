import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-member-request-history',
  templateUrl: './member-request-history.component.html',
  styleUrls: ['./member-request-history.component.css']
})
export class MemberRequestHistoryComponent implements OnInit {
  memberRequestHistory=[];
  memberApprovedData: any;
  noRequestAvailable:boolean=false;
  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.memberWihtdrawalRequest();
  }
  memberWihtdrawalRequest() {
    this.userService.memberWithdrawalRequest().subscribe({
      next: (response: any) => {
        if (response) {
          this.memberRequestHistory = Object.values(response.data);
          console.log(this.memberRequestHistory);
         
          
        }
      },
      error: error => {
        this.toastr.error('Something went wrong', 'Error');
      }
    })
  }

  sendUserId(value,id) {
    console.log(id);
    let data = {
      m_userid: value,
      id:id
    }
    this.userService.adminWillApprovedMemberRequest(data).subscribe({
      next: (response: any) => {
        if (response) {

          this.ngOnInit();
          this.toastr.success('Request Approved', 'Success');
        }
      },
      error: error => {
        this.toastr.error('Something went wrong!');
      }
    }
    )
  }

}
