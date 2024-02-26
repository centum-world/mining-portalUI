import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-cradentils',
  templateUrl: './cradentils.component.html',
  styleUrls: ['./cradentils.component.css']
})
export class CradentilsComponent implements OnInit {
    image:string="";
    imagePartner:string = "../../../../assets/image/partnergif.gif";
    imageReferral:string = "../../../../assets/image/referralgif.gif";
    imageFranchise:string = "../../../../assets/image/franchisegif.gif";
    imageBmm:string = "../../../../assets/image/bmmgif.gif";

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('Received data:', this.data);
  }
  

  ngOnInit() {
    if(this.data.userType === 'PARTNER'){
      this.image = this.imagePartner
    }else if(this.data.userType === 'REFERRAL'){
      this.image = this.imageReferral
    }else if(this.data.userType === 'FRANCHISE'){
      this.image = this.imageFranchise
    }else if(this.data.userType === 'BMM'){
      this.image = this.imageBmm
    }
    
  }

  downloadPdf() {
    const pdf = new jsPDF();
    const content: HTMLElement = document.getElementById('pdfContent');

    pdf.html(content, {
      callback: () => {
        pdf.save('credentials.pdf');
      },
      html2canvas: {
        scale: 0.5, 
      },
    });
  }
}
