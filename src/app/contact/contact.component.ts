import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

declare var emailjs: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';

  constructor(private toastr: ToastrService) { }

  sendEmail() {
    const templateParams = {
      to_name: this.name,
      from_email: this.email,
      message: this.message
    };

    emailjs.send('service_rkjubno', 'template_5inlwwy', templateParams, 'qoR2rMGkc83u2KsWw')
      .then((response: any) => {
        console.log('SUCCESS!', response.status, response.text);
        // Show toaster for successful email sending
        this.toastr.success('Email sent successfully!', 'Success');
        // Clear form fields after successful submission
        this.name = '';
        this.email = '';
        this.message = '';
      }, (err: any) => {
        console.log('FAILED...', err);
        // Show toaster for failed email sending
        this.toastr.error('Failed to send email!', 'Error');
      });
  }
}
