import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-help-support',
  templateUrl: './help-support.component.html',
  styleUrls: ['./help-support.component.css']
})
export class HelpSupportComponent implements OnInit {

  myForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService : UserService, private toastr : ToastrService) {
    this.myForm = this.formBuilder.group({
      myQuery: [''] // Initialize with an empty value
    });
  }

  ngOnInit() {
  }

  submitQuery(){
    
    const queryValue = this.myForm.value.myQuery;
    console.log(queryValue)
     let data = {
      p_userid: localStorage.getItem('partnerdetails'),
      query: queryValue
    }


    if (queryValue.trim() === '') {
      this.toastr.warning('Query is empty. Please enter a query.')
    } else {
      this.userService.partnerHelpAndQuery(data).subscribe({
        next: (response: any) => {
          if (response) {
            this.toastr.success("Query Submitted");
          }
        },
        error:error=>{
          this.toastr.error('Something Went Wrong', 'Error');
        }
      })
      this.myForm.reset();
    }
    
  }
  reset(){
    this.myForm.reset();
  }
 
}
