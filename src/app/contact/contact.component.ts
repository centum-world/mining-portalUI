import { Component } from '@angular/core';

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

  constructor() { }

  sendEmail() {
    const templateParams = {
      to_name: this.name,
      from_email: this.email,
      message: this.message
    };

    emailjs.send('service_hb3bnbb', 'template_htr5muq', templateParams, 'u1t_nBxroUgPBVoF8')
      .then((response: any) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err: any) => {
        console.log('FAILED...', err);
      });
  }
}
